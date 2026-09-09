import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');
  }

  async getBodyText() {
    return this.page.locator('body').textContent();
  }
}
