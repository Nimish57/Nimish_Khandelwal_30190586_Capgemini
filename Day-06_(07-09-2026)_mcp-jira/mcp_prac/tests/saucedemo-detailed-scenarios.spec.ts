import { test, expect, type Page } from '@playwright/test';
import { readLoginData, type LoginData } from '../test-data/test-data';

const BASE_URL = 'https://www.saucedemo.com/';

const loginData = readLoginData();
const validLoginData = loginData.filter((data) => data.username !== 'locked_out_user');

function getUser(username: string): LoginData {
  const user = loginData.find((data) => data.username === username);

  if (!user) {
    throw new Error(`User ${username} was not found in TestData.xlsx`);
  }

  return user;
}

const users = {
  standard: getUser('standard_user'),
  locked: getUser('locked_out_user'),
  problem: getUser('problem_user'),
  glitch: getUser('performance_glitch_user'),
};

async function gotoLogin(page: Page) {
  await page.goto(BASE_URL);
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

async function login(page: Page, username: string, password: string) {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

async function loginAsStandard(page: Page) {
  await gotoLogin(page);
  await login(page, users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory\.html/);
}

async function addBackpack(page: Page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
}

function parseCurrency(value: string): number {
  return Number(value.replace(/[^\d.]/g, ''));
}

test.describe('SauceDemo Detailed Scenarios (TS_001 - TS_041)', () => {
  for (const { username, password } of validLoginData) {
    test(`TS_001 Login - Valid Login with ${username}`, async ({ page }) => {
      await gotoLogin(page);
      await login(page, username, password);
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });
  }

  test('TS_002 Login - Invalid Login', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'invalid_user', 'invalid_pass');
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test('TS_003 Login - Empty Username', async ({ page }) => {
    await gotoLogin(page);
    await login(page, '', users.standard.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(/Username is required/);
  });

  test('TS_004 Login - Empty Password', async ({ page }) => {
    await gotoLogin(page);
    await login(page, users.standard.username, '');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Password is required/);
  });

  test('TS_005 Login - Empty Username and Password', async ({ page }) => {
    await gotoLogin(page);
    await login(page, '', '');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Username is required/);
  });

  test('TS_006 Login - Locked Out User Validation', async ({ page }) => {
    await gotoLogin(page);
    await login(page, users.locked.username, users.locked.password);
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test('TS_007 Login - Problem User Login', async ({ page }) => {
    await gotoLogin(page);
    await login(page, users.problem.username, users.problem.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  test('TS_008 Login - Performance Glitch User Login', async ({ page }) => {
    await gotoLogin(page);
    const start = Date.now();
    await login(page, users.glitch.username, users.glitch.password);
    await expect(page).toHaveURL(/inventory\.html/);
    const elapsedMs = Date.now() - start;
    expect(elapsedMs).toBeLessThan(20000);
  });

  test('TS_009 Login - Error Message Validation', async ({ page }) => {
    await gotoLogin(page);
    await login(page, 'wrong', 'wrong');
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface:');
    await expect(error).toContainText('do not match any user in this service');
  });

  test('TS_010 Login - Session Persistence Validation', async ({ page }) => {
    await loginAsStandard(page);
    await page.reload();
    await expect(page).toHaveURL(/inventory\.html/);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);
    await page.goBack();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TS_011 Products Page - Verify Product List Display', async ({ page }) => {
    await loginAsStandard(page);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });

  test('TS_012 Products Page - Verify Product Name Display', async ({ page }) => {
    await loginAsStandard(page);
    const names = page.locator('[data-test="inventory-item-name"]');
    await expect(names.first()).toBeVisible();
    await expect(names).toHaveCount(6);
  });

  test('TS_013 Products Page - Verify Product Price Display', async ({ page }) => {
    await loginAsStandard(page);
    const prices = page.locator('[data-test="inventory-item-price"]');
    await expect(prices).toHaveCount(6);
    await expect(prices.first()).toContainText('$');
  });

  test('TS_014 Products Page - Sort Name A-Z', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const firstName = await page.locator('[data-test="inventory-item-name"]').first().textContent();
    expect(firstName?.trim()).toBe('Sauce Labs Backpack');
  });

  test('TS_015 Products Page - Sort Name Z-A', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const firstName = await page.locator('[data-test="inventory-item-name"]').first().textContent();
    expect(firstName?.trim()).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('TS_016 Products Page - Sort Price Low-High', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const firstPrice = await page.locator('[data-test="inventory-item-price"]').first().textContent();
    expect(parseCurrency(firstPrice ?? '')).toBe(7.99);
  });

  test('TS_017 Products Page - Sort Price High-Low', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const firstPrice = await page.locator('[data-test="inventory-item-price"]').first().textContent();
    expect(parseCurrency(firstPrice ?? '')).toBe(49.99);
  });

  test('TS_018 Products Page - Verify Product Inventory Display', async ({ page }) => {
    await loginAsStandard(page);
    const firstItem = page.locator('[data-test="inventory-item"]').first();
    await expect(firstItem.locator('img')).toBeVisible();
    await expect(firstItem.locator('[data-test="inventory-item-name"]')).toBeVisible();
    await expect(firstItem.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(firstItem.locator('[data-test="inventory-item-price"]')).toContainText('$');
    await expect(firstItem.getByRole('button')).toBeVisible();
  });

  test('TS_019 Product Details - Open Product Detail Page', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
  });

  test('TS_020 Product Details - Verify Product Information', async ({ page }) => {
    await loginAsStandard(page);
    const listName = await page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]').textContent();
    const listPrice = await page.locator('[data-test="inventory-item"]').first().locator('[data-test="inventory-item-price"]').textContent();
    const productName = (listName ?? '').trim();
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(productName);
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText((listPrice ?? '').trim());
    await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(page.getByRole('img', { name: productName })).toBeVisible();
  });

  test('TS_021 Product Details - Navigate Back to Products', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TS_022 Add to Cart - Add Single Product', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('TS_023 Add to Cart - Add Multiple Products', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
  });

  test('TS_024 Add to Cart - Verify Cart Badge Count', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  });

  test('TS_025 Add to Cart - Remove Product from Products Page', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });

  test('TS_026 Shopping Cart - Verify Added Products in Cart', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
  });

  test('TS_027 Shopping Cart - Remove Product from Cart', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
  });

  test('TS_028 Shopping Cart - Continue Shopping', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TS_029 Shopping Cart - Verify Cart Persistence', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
    await page.locator('[data-test="continue-shopping"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
  });

  test('TS_030 Checkout Information - Valid Checkout Information', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TS_031 Checkout Information - Empty First Name', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('TS_032 Checkout Information - Empty Last Name', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });

  test('TS_033 Checkout Information - Empty Postal Code', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('TS_034 Checkout Information - Verify Mandatory Field Error Messages', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('First Name is required');
  });

  test('TS_035 Checkout Overview - Verify Product Summary', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
  });

  test('TS_036 Checkout Overview - Verify Tax Calculation', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();

    const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
    const taxText = await page.locator('[data-test="tax-label"]').textContent();
    const subtotal = parseCurrency(subtotalText ?? '');
    const tax = parseCurrency(taxText ?? '');
    const expectedTax = Number((subtotal * 0.08).toFixed(2));

    expect(tax).toBe(expectedTax);
  });

  test('TS_037 Checkout Overview - Verify Total Amount Calculation', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();

    const subtotal = parseCurrency((await page.locator('[data-test="subtotal-label"]').textContent()) ?? '');
    const tax = parseCurrency((await page.locator('[data-test="tax-label"]').textContent()) ?? '');
    const total = parseCurrency((await page.locator('[data-test="total-label"]').textContent()) ?? '');
    const expectedTotal = Number((subtotal + tax).toFixed(2));

    expect(total).toBe(expectedTotal);
  });

  test('TS_038 Order Completion - Complete Purchase Successfully', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
  });

  test('TS_039 Order Completion - Verify Order Confirmation Message', async ({ page }) => {
    await loginAsStandard(page);
    await addBackpack(page);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('560001');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched');
  });

  test('TS_040 Logout - Successful Logout', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('TS_041 Logout - Verify Access Restriction After Logout', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);

    await page.goto('https://www.saucedemo.com/cart.htm');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
