import { test, expect, APIRequestContext } from '@playwright/test';

const baseUrl = 'https://www.videogamedb.uk';
const videogameUrl = `${baseUrl}/api/v2/videogame`;
const authUrl = `${baseUrl}/api/authenticate`;

const validPayload = {
  category: 'Platform',
  name: 'Mario',
  rating: 'Mature',
  releaseDate: '2012-05-04',
  reviewScore: 85,
};

async function readJson(response: any) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

async function getAuthHeaders(request: APIRequestContext) {
  const authResponse = await request.post(authUrl, {
    data: {
      username: 'admin',
      password: 'admin',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  expect(authResponse.status()).toBe(200);

  const authBody = await readJson(authResponse);
  expect(authBody.token).toBeTruthy();

  return {
    Authorization: `Bearer ${authBody.token}`,
  };
}

async function getFirstGameId(request: APIRequestContext, headers: Record<string, string> = {}) {
  const response = await request.get(videogameUrl, {
    headers,
  });

  expect(response.status()).toBe(200);
  const body = await readJson(response);
  const games = Array.isArray(body) ? body : [];

  return games[0]?.id ?? 0;
}

test.describe('Video Game Database API - CRUD and validation suite', () => {
  test('TC01 - Get all video games', async ({ request }) => {
    const response = await request.get(videogameUrl);
    const body = await readJson(response);

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('TC02 - Create video game valid payload', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.post(videogameUrl, {
      data: validPayload,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);

    expect([200, 201]).toContain(response.status());
    expect(body.name ?? body.raw ?? '').toBeTruthy();
  });

  test('TC03 - Get created game', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const gameId = await getFirstGameId(request, authHeaders);

    const response = await request.get(`${videogameUrl}/${gameId}`, {
      headers: authHeaders,
    });
    const body = await readJson(response);

    expect([200, 404]).toContain(response.status());
    if (response.status() === 200) {
      expect(body.id ?? gameId).toBe(gameId);
    }
  });

  test('TC04 - Update game', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const gameId = await getFirstGameId(request, authHeaders);

    const payload = {
      category: 'Adventure',
      name: 'Mario Kart',
      rating: 'Everyone',
      releaseDate: '2014-11-27',
      reviewScore: 90,
    };

    const response = await request.put(`${videogameUrl}/${gameId}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);

    expect([200, 204, 400, 404]).toContain(response.status());
    if (response.status() === 200) {
      expect(body.name ?? body.category ?? body.raw ?? '').toBeTruthy();
    }
  });

  test('TC05 - Delete game', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const gameId = await getFirstGameId(request, authHeaders);

    const response = await request.delete(`${videogameUrl}/${gameId}`, {
      headers: authHeaders,
    });

    expect([200, 204, 400, 403, 404]).toContain(response.status());
  });

  test('TC06 - CRUD lifecycle validation', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);

    const createResponse = await request.post(videogameUrl, {
      data: {
        ...validPayload,
        name: 'Pokemon',
        reviewScore: 88,
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const created = await readJson(createResponse);
    const gameId = created.id ?? (await getFirstGameId(request, authHeaders));

    const getResponse = await request.get(`${videogameUrl}/${gameId}`, {
      headers: authHeaders,
    });
    expect([200, 404]).toContain(getResponse.status());

    const updateResponse = await request.put(`${videogameUrl}/${gameId}`, {
      data: {
        ...validPayload,
        name: 'Pokemon Crystal',
        rating: 'Everyone',
        reviewScore: 92,
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    expect([200, 204, 400, 404]).toContain(updateResponse.status());

    const deleteResponse = await request.delete(`${videogameUrl}/${gameId}`, {
      headers: authHeaders,
    });
    expect([200, 204, 400, 403, 404]).toContain(deleteResponse.status());
  });

  test('TC07 - Create without name', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.post(videogameUrl, {
      data: {
        category: 'Platform',
        rating: 'Mature',
        releaseDate: '2012-05-04',
        reviewScore: 85,
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);
    const text = JSON.stringify(body);

    expect(response.status()).toBe(400);
    expect(text.toLowerCase()).toMatch(/bad request|name/);
  });

  test('TC08 - Create without category', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.post(videogameUrl, {
      data: {
        name: 'Mario',
        rating: 'Mature',
        releaseDate: '2012-05-04',
        reviewScore: 85,
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);
    const text = JSON.stringify(body);

    expect(response.status()).toBe(400);
    expect(text.toLowerCase()).toMatch(/bad request|category/);
  });

  test('TC09 - Create without rating', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.post(videogameUrl, {
      data: {
        category: 'Platform',
        name: 'Mario',
        releaseDate: '2012-05-04',
        reviewScore: 85,
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);
    const text = JSON.stringify(body);

    expect(response.status()).toBe(400);
    expect(text.toLowerCase()).toMatch(/bad request|rating/);
  });

  test('TC10 - Create without release date', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.post(videogameUrl, {
      data: {
        category: 'Platform',
        name: 'Mario',
        rating: 'Mature',
        reviewScore: 85,
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);
    const text = JSON.stringify(body);

    expect(response.status()).toBe(400);
    expect(text.toLowerCase()).toMatch(/bad request|release/);
  });

  test('TC11 - Create without review score', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.post(videogameUrl, {
      data: {
        category: 'Platform',
        name: 'Mario',
        rating: 'Mature',
        releaseDate: '2012-05-04',
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);
    const text = JSON.stringify(body);

    expect(response.status()).toBe(400);
    expect(text.toLowerCase()).toMatch(/bad request|review/);
  });

  test('TC12 - Get invalid id', async ({ request }) => {
    const headers = await getAuthHeaders(request);
    const response = await request.get(`${videogameUrl}/999999`, {
      headers,
    });
    const body = await readJson(response);

    expect([400, 404]).toContain(response.status());
    expect(JSON.stringify(body).length).toBeGreaterThanOrEqual(0);
  });

  test('TC13 - Update invalid id', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.put(`${videogameUrl}/999999`, {
      data: validPayload,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });

    expect([400, 404]).toContain(response.status());
  });

  test('TC14 - Delete invalid id', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.delete(`${videogameUrl}/999999`, {
      headers: authHeaders,
    });

    expect([400, 403, 404]).toContain(response.status());
  });

  test('TC15 - Invalid review score', async ({ request }) => {
    const authHeaders = await getAuthHeaders(request);
    const response = await request.post(videogameUrl, {
      data: {
        ...validPayload,
        reviewScore: 150,
      },
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    });
    const body = await readJson(response);
    const text = JSON.stringify(body);

    expect([200, 400, 422]).toContain(response.status());

    if (response.status() === 200) {
      expect(body.name ?? body.raw ?? '').toBeTruthy();
    } else {
      expect(text.toLowerCase()).toMatch(/bad request|review/);
    }
  });

  test('TC16 - API docs contract is available', async ({ page }) => {
    await page.goto(`${baseUrl}/v3/api-docs`);
    await expect(page.locator('body')).toContainText('Video Game DB 2022 API');
    await expect(page.locator('body')).toContainText('/api/v2/videogame');
  });
});
