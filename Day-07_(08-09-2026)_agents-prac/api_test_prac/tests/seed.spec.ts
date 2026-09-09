import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://videogamedb.uk:443/api/v2/videogame');
  });
});
