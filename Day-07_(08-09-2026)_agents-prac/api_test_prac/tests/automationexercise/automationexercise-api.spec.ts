import { test, expect, APIResponse } from '@playwright/test';

const baseUrl = 'https://automationexercise.com/api';
const testEmail = 'johndoe@example.com';

async function readJson(response: APIResponse) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

test.describe('Automation Exercise API - imported from Postman New Collection', () => {
  test('TC01 - Get all products', async ({ request }) => {
    const response = await request.get(`${baseUrl}/productsList`);
    const body = await readJson(response);

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
  });

  test('TC02 - Search products by name', async ({ request }) => {
    const response = await request.post(`${baseUrl}/searchProduct`, {
      form: {
        search_product: 'jean',
      },
    });
    const body = await readJson(response);

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
  });

  test('TC03 - Verify login request', async ({ request }) => {
    const response = await request.post(`${baseUrl}/verifyLogin`, {
      form: {
        email: 'prac@gmail.com',
        password: '1234546789@Hi',
      },
    });
    const body = await readJson(response);

    expect([200, 404]).toContain(response.status());
    expect([200, 404]).toContain(body.responseCode);
    expect(body.message).toBeTruthy();
  });

  test('TC04 - Get all brands', async ({ request }) => {
    const response = await request.get(`${baseUrl}/brandsList`);
    const body = await readJson(response);

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBeTruthy();
  });

  test('TC05 - Create user account', async ({ request }) => {
    const response = await request.post(`${baseUrl}/createAccount`, {
      data: {
        name: 'John Doe',
        email: testEmail,
        password: 'Password123',
        title: 'Mr',
        birth_date: '15',
        birth_month: '05',
        birth_year: '1995',
        firstname: 'John',
        lastname: 'Doe',
        company: 'ABC Technologies',
        address1: '123 Main Street',
        address2: 'Apartment 4B',
        country: 'India',
        zipcode: '560001',
        state: 'Karnataka',
        city: 'Bangalore',
        mobile_number: '9876543210',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await readJson(response);

    expect(response.status()).toBe(200);
    expect([200, 201, 400]).toContain(body.responseCode);
    expect(body.message).toBeTruthy();
  });

  test('TC06 - Get user details by email', async ({ request }) => {
    const response = await request.get(`${baseUrl}/getUserDetailByEmail`, {
      params: {
        email: testEmail,
      },
    });
    const body = await readJson(response);

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.user.email).toBe(testEmail);
  });
});
