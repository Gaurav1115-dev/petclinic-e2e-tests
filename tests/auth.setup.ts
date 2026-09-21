import { test as setup, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { HomePage } from '../pageObjects/homePage'; 

dotenv.config({ path: '.env' });
const authFile = 'playwright/.auth/user.json';
 // Initialize with null, will be set in the test

setup('auth setup', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('/'); 
  await homePage.login(`${process.env.ENV_USERNAME}`, `${process.env.ENV_PASSWORD}`);
  await expect(page).toHaveURL('https://petclinic.bondaracademy.com/');
  await page.context().storageState({ path: authFile });
});
