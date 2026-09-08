# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo-detailed-scenarios.spec.ts >> SauceDemo Detailed Scenarios (TS_001 - TS_041) >> TS_041 Logout - Verify Access Restriction After Logout
- Location: tests\saucedemo-detailed-scenarios.spec.ts:417:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /saucedemo\.com\/?$/
Received string:  "https://www.saucedemo.com/cart.htm"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://www.saucedemo.com/cart.htm"

```

# Test source

```ts
  326 |     const error = page.locator('[data-test="error"]');
  327 |     await expect(error).toBeVisible();
  328 |     await expect(error).toContainText('First Name is required');
  329 |   });
  330 | 
  331 |   test('TS_035 Checkout Overview - Verify Product Summary', async ({ page }) => {
  332 |     await loginAsStandard(page);
  333 |     await addBackpack(page);
  334 |     await page.locator('[data-test="shopping-cart-link"]').click();
  335 |     await page.locator('[data-test="checkout"]').click();
  336 |     await page.locator('[data-test="firstName"]').fill('John');
  337 |     await page.locator('[data-test="lastName"]').fill('Doe');
  338 |     await page.locator('[data-test="postalCode"]').fill('560001');
  339 |     await page.locator('[data-test="continue"]').click();
  340 |     await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  341 |     await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
  342 |   });
  343 | 
  344 |   test('TS_036 Checkout Overview - Verify Tax Calculation', async ({ page }) => {
  345 |     await loginAsStandard(page);
  346 |     await addBackpack(page);
  347 |     await page.locator('[data-test="shopping-cart-link"]').click();
  348 |     await page.locator('[data-test="checkout"]').click();
  349 |     await page.locator('[data-test="firstName"]').fill('John');
  350 |     await page.locator('[data-test="lastName"]').fill('Doe');
  351 |     await page.locator('[data-test="postalCode"]').fill('560001');
  352 |     await page.locator('[data-test="continue"]').click();
  353 | 
  354 |     const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
  355 |     const taxText = await page.locator('[data-test="tax-label"]').textContent();
  356 |     const subtotal = parseCurrency(subtotalText ?? '');
  357 |     const tax = parseCurrency(taxText ?? '');
  358 |     const expectedTax = Number((subtotal * 0.08).toFixed(2));
  359 | 
  360 |     expect(tax).toBe(expectedTax);
  361 |   });
  362 | 
  363 |   test('TS_037 Checkout Overview - Verify Total Amount Calculation', async ({ page }) => {
  364 |     await loginAsStandard(page);
  365 |     await addBackpack(page);
  366 |     await page.locator('[data-test="shopping-cart-link"]').click();
  367 |     await page.locator('[data-test="checkout"]').click();
  368 |     await page.locator('[data-test="firstName"]').fill('John');
  369 |     await page.locator('[data-test="lastName"]').fill('Doe');
  370 |     await page.locator('[data-test="postalCode"]').fill('560001');
  371 |     await page.locator('[data-test="continue"]').click();
  372 | 
  373 |     const subtotal = parseCurrency((await page.locator('[data-test="subtotal-label"]').textContent()) ?? '');
  374 |     const tax = parseCurrency((await page.locator('[data-test="tax-label"]').textContent()) ?? '');
  375 |     const total = parseCurrency((await page.locator('[data-test="total-label"]').textContent()) ?? '');
  376 |     const expectedTotal = Number((subtotal + tax).toFixed(2));
  377 | 
  378 |     expect(total).toBe(expectedTotal);
  379 |   });
  380 | 
  381 |   test('TS_038 Order Completion - Complete Purchase Successfully', async ({ page }) => {
  382 |     await loginAsStandard(page);
  383 |     await addBackpack(page);
  384 |     await page.locator('[data-test="shopping-cart-link"]').click();
  385 |     await page.locator('[data-test="checkout"]').click();
  386 |     await page.locator('[data-test="firstName"]').fill('John');
  387 |     await page.locator('[data-test="lastName"]').fill('Doe');
  388 |     await page.locator('[data-test="postalCode"]').fill('560001');
  389 |     await page.locator('[data-test="continue"]').click();
  390 |     await page.locator('[data-test="finish"]').click();
  391 |     await expect(page).toHaveURL(/checkout-complete\.html/);
  392 |   });
  393 | 
  394 |   test('TS_039 Order Completion - Verify Order Confirmation Message', async ({ page }) => {
  395 |     await loginAsStandard(page);
  396 |     await addBackpack(page);
  397 |     await page.locator('[data-test="shopping-cart-link"]').click();
  398 |     await page.locator('[data-test="checkout"]').click();
  399 |     await page.locator('[data-test="firstName"]').fill('John');
  400 |     await page.locator('[data-test="lastName"]').fill('Doe');
  401 |     await page.locator('[data-test="postalCode"]').fill('560001');
  402 |     await page.locator('[data-test="continue"]').click();
  403 |     await page.locator('[data-test="finish"]').click();
  404 |     await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  405 |     await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched');
  406 |   });
  407 | 
  408 |   test('TS_040 Logout - Successful Logout', async ({ page }) => {
  409 |     await loginAsStandard(page);
  410 |     await page.locator('#react-burger-menu-btn').click();
  411 |     await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
  412 |     await page.locator('[data-test="logout-sidebar-link"]').click();
  413 |     await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  414 |     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  415 |   });
  416 | 
  417 |   test('TS_041 Logout - Verify Access Restriction After Logout', async ({ page }) => {
  418 |     await loginAsStandard(page);
  419 |     await page.locator('#react-burger-menu-btn').click();
  420 |     await page.locator('[data-test="logout-sidebar-link"]').click();
  421 | 
  422 |     await page.goto('https://www.saucedemo.com/inventory.html');
  423 |     await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  424 | 
  425 |     await page.goto('https://www.saucedemo.com/cart.htm');
> 426 |     await expect(page).toHaveURL(/saucedemo\.com\/?$/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  427 |   });
  428 | });
  429 | 
```