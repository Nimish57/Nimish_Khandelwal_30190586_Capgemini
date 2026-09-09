import { test } from '@playwright/test';
import { SwaggerPage } from './page-objects/swaggerPage';

test.describe('Video Game Database API - Swagger contract validation', () => {
  test('TC01 - API docs load and list V2 endpoint contract', async ({ page }) => {
    const swaggerPage = new SwaggerPage(page);

    await swaggerPage.openSwaggerDocs();
    await swaggerPage.expectApiTitle();
    await swaggerPage.expectReadOnlyModeWarning();
    await swaggerPage.expectV2VideoGameEndpoints();
    await swaggerPage.expectRequestSchemaFields();
  });

  test('TC02 - V2 videogame contract includes create, read, update and delete operations', async ({ page }) => {
    const swaggerPage = new SwaggerPage(page);

    await swaggerPage.openSwaggerDocs();
    await swaggerPage.expectV2VideoGameEndpoints();
    await swaggerPage.expectRequestSchemaFields();
  });

  test('TC03 - Required fields for the request schema are visible in the API docs', async ({ page }) => {
    const swaggerPage = new SwaggerPage(page);

    await swaggerPage.openSwaggerDocs();
    await swaggerPage.expectRequestSchemaFields();
  });
});
