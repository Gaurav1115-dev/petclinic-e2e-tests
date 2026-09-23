/// <reference types="node" />
import { chromium } from '@playwright/test';
import process from 'process';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = '.auth/user.json';

async function browserAuthorize(config: { use?: { baseURL?: string; storageState?: string } } = {}) {
  const baseURL = config.use?.baseURL || process.env.BASE_URL || 'https://petclinic.bondaracademy.com';
  const storageState = config.use?.storageState || '.auth/user.json';

  if (!baseURL) {
    throw new Error('baseURL is not configured in playwright.config.ts');
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

    const username = process.env.EMAIL || process.env.USERNAME;
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('EMAIL or USERNAME and PASSWORD environment variables are missing');
    }

    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Continue' }).click();

    const tokenResponse = await page.waitForResponse(
      (response) =>
        response.url().includes('/token') &&
        response.status() >= 200 &&
        response.status() < 300,
      { timeout: 30000 }
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Access token not found in token API response');
    }

    process.env.ACCESS_TOKEN = accessToken;

    const storagePath = typeof storageState === 'string' ? storageState : filePath;
    await context.storageState({ path: storagePath });
  } finally {
    await browser.close();
  }
}

export default browserAuthorize;