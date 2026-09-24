import { Page, Locator, Response } from '@playwright/test';

export class PetTypePage {

  readonly editBtn: Locator;
  readonly deleteBtn: Locator;
  readonly homeBtn: Locator;
  readonly addBtn: Locator;
  readonly updateBtn: Locator;
  readonly cancelBtn: Locator;
  readonly updatePetTypeInput: Locator;

  constructor(private page: Page) {
    this.editBtn = page.getByRole('button', { name: 'Edit' });
    this.deleteBtn = page.getByRole('button', { name: 'Delete' });
    this.homeBtn = page.getByRole('button', { name: 'Home' });
    this.addBtn = page.getByRole('button', { name: 'Add' });
    this.updateBtn = page.getByRole('button', { name: 'Update' });
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    this.updatePetTypeInput = page.locator('input[id="name"]');
  }

  async updatePetType(currentPetTypeName: string, updatedPetTypeName: string): Promise<void> {

    const rowCount = this.page.locator('#pettypes tbody tr')

    for (let i = 0; i < await rowCount.count(); i++) {

      const row = rowCount.nth(i);

      const petType = await row
        .locator('input[name="pettype_name"]')
        .inputValue();

      if (petType.toLowerCase() === currentPetTypeName) {

        await row
          .getByRole('button', { name: 'Edit', exact: true })
          .click();

        break;

      }
    }

  }
}