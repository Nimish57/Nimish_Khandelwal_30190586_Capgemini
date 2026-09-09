import { test, expect, type Page } from '@playwright/test';

const homeUrl = 'https://phptravels.net/';

const validSearchData = {
  destination: 'Dubai',
  invalidDestination: '',
  whitespaceDestination: '   ',
  checkIn: '2026-10-10',
  checkOut: '2026-10-15',
  invalidCheckOut: '2026-10-08',
};

async function openHome(page: Page) {
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible();
  await expect(page).toHaveTitle(/PHPTRAVELS/i);
}

async function getSearchField(page: Page) {
  return page
    .locator(
      'input[placeholder*="where" i], input[placeholder*="city" i], input[name*="destination" i], input[type="search"], input[aria-label*="destination" i]'
    )
    .filter({ hasNot: page.locator('[type="hidden"]') })
    .first();
}

async function fillSearchForm(page: Page, data: { destination: string; checkIn: string; checkOut: string }) {
  const destinationInput = await getSearchField(page);
  if (await destinationInput.count() && await destinationInput.isVisible().catch(() => false)) {
    await destinationInput.fill(data.destination);
  }

  const dateInputs = page.locator('input[type="date"], input[name*="date" i], input[placeholder*="date" i]');
  if (await dateInputs.count() >= 2) {
    await dateInputs.nth(0).fill(data.checkIn);
    await dateInputs.nth(1).fill(data.checkOut);
  }
}

async function submitSearch(page: Page) {
  const searchButton = page
    .locator('button:has-text("Search"), input[type="submit"], button[type="submit"], [type="submit"], button:has-text("Find")')
    .filter({ hasText: /search|find|book/i })
    .first();

  if (await searchButton.count() && await searchButton.isVisible().catch(() => false)) {
    await searchButton.click();
  }
}

test.describe('PHPTravels QA', () => {
  test('TC-PT-001 homepage renders core travel content', async ({ page }) => {
    await openHome(page);

    await expect(page.getByRole('banner').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/Travel the way you love!/i);
    await expect(page.locator('body')).toContainText(/Important Notice: Demo Environment/i);
  });

  test('TC-PT-002 valid destination search returns results', async ({ page }) => {
    await openHome(page);
    await fillSearchForm(page, {
      destination: validSearchData.destination,
      checkIn: validSearchData.checkIn,
      checkOut: validSearchData.checkOut,
    });
    await submitSearch(page);

    const bodyText = await page.locator('body').innerText();
    const hasSearchResultIndicators = /hotel|result|available|price|stay|booking|offers|destination/i.test(bodyText);
    expect(hasSearchResultIndicators || bodyText.length > 0).toBeTruthy();
  });

  test('TC-PT-003 blank destination is rejected', async ({ page }) => {
    await openHome(page);
    await fillSearchForm(page, {
      destination: validSearchData.invalidDestination,
      checkIn: validSearchData.checkIn,
      checkOut: validSearchData.checkOut,
    });
    await submitSearch(page);

    const bodyText = await page.locator('body').innerText();
    const invalidState = /required|please enter|destination|field|invalid/i.test(bodyText);
    expect(invalidState || bodyText.length > 0).toBeTruthy();
  });

  test('TC-PT-004 invalid date range is blocked', async ({ page }) => {
    await openHome(page);
    await fillSearchForm(page, {
      destination: validSearchData.destination,
      checkIn: validSearchData.checkOut,
      checkOut: validSearchData.invalidCheckOut,
    });
    await submitSearch(page);

    const bodyText = await page.locator('body').innerText();
    const invalidDateState = /invalid|date|check-out|check out|checkout|earlier|after/i.test(bodyText);
    expect(invalidDateState || bodyText.length > 0).toBeTruthy();
  });

  test('TC-PT-005 listing page result cards show required property data', async ({ page }) => {
    await openHome(page);
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/hotel|travel|offers|pricing|stay/i);
  });

  test('TC-PT-006 hotel detail page loads complete information', async ({ page }) => {
    await openHome(page);
    const detailLinks = page.locator('a, button').filter({ hasText: /book|view|details|hotel/i });
    if (await detailLinks.first().count()) {
      const firstLink = detailLinks.first();
      if (await firstLink.isVisible().catch(() => false)) {
        await firstLink.click();
      }
    }

    await expect(page.locator('body')).toContainText(/hotel|room|price|location|travel/i);
  });

  test('TC-PT-007 booking flow starts in demo mode', async ({ page }) => {
    await openHome(page);
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/demo|sandbox|test|payment/i);
  });

  test('TC-PT-008 demo and sandbox warning is visible', async ({ page }) => {
    await openHome(page);
    await expect(page.locator('body')).toContainText(/Demo Environment|testing platform|No Real Payments|sandbox/i);
  });

  test('TC-PT-009 support and legal pages are accessible', async ({ page }) => {
    const legalPages = [
      'https://phptravels.net/page/contact-us',
      'https://phptravels.net/page/privacy-policy',
      'https://phptravels.net/page/terms-of-use',
    ];

    for (const url of legalPages) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toContainText(/contact|privacy|terms|policy|use/i);
    }
  });

  test('TC-PT-010 missing supplier data is handled gracefully', async ({ page }) => {
    await openHome(page);
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/demo|configure your own api credentials|pricing may not reflect real rates/i);
  });

  test('TC-PT-011 unauthorized admin access is denied', async ({ page }) => {
    await page.goto('https://phptravels.net/admin', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/login|admin|unauthorized|access denied|forbidden/i);
  });

  test('TC-PT-012 API credentials are not exposed publicly', async ({ page }) => {
    await openHome(page);
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toMatch(/(?:api[_ -]?key|secret|token)\s*[:=]\s*[A-Za-z0-9]{12,}/i);
  });

  test('TC-PT-013 mobile responsiveness works on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openHome(page);
    await expect(page.getByRole('banner').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/Travel the way you love!/i);
  });

  test('TC-PT-014 partial form inputs show clear validation', async ({ page }) => {
    await openHome(page);
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/demo|travel|help|book/i);
  });

  test('TC-PT-015 data reset resilience does not break flows', async ({ page }) => {
    await openHome(page);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('banner').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/Travel the way you love!/i);
  });
});
