import { test, expect } from '@playwright/test';


test('Login Test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('https://petclinic.bondaracademy.com/');
  
});