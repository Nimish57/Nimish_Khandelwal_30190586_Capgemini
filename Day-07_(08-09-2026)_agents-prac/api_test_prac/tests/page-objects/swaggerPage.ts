import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class SwaggerPage extends BasePage {
  private readonly swaggerUrl = 'https://www.videogamedb.uk/v3/api-docs';

  constructor(page: Page) {
    super(page);
  }

  async openSwaggerDocs() {
    await this.open(this.swaggerUrl);
    await this.waitForPageReady();
  }

  async expectApiTitle() {
    await expect(this.page.locator('body')).toContainText('Video Game DB 2022 API');
  }

  async expectV2VideoGameEndpoints() {
    const body = this.page.locator('body');

    await expect(body).toContainText('/api/v2/videogame');
    await expect(body).toContainText('List all video games');
    await expect(body).toContainText('Create a video game');
    await expect(body).toContainText('Get a video game');
    await expect(body).toContainText('Update a video game');
    await expect(body).toContainText('Delete a video game');
  }

  async expectRequestSchemaFields() {
    const body = this.page.locator('body');

    await expect(body).toContainText('category');
    await expect(body).toContainText('name');
    await expect(body).toContainText('rating');
    await expect(body).toContainText('releaseDate');
    await expect(body).toContainText('reviewScore');
  }

  async expectReadOnlyModeWarning() {
    const body = this.page.locator('body');
    await expect(body).toContainText('READ ONLY mode');
  }
}
