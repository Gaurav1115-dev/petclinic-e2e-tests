import { Page, Locator } from '@playwright/test';



export class HomePage {
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.userName = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name:'Continue' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}