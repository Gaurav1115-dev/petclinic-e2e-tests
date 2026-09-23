import { Page, Locator } from '@playwright/test';



export class OwnersPage {
    readonly owner: Locator;
    readonly addNew: Locator;
    readonly search: Locator;
    readonly addNewFName: Locator;
    readonly addNewLName: Locator;
    readonly addNewAddress: Locator;
    readonly addNewCity: Locator;
    readonly addNewTelephone: Locator;
    readonly addnewAddnewBtn: Locator;
    readonly addnewBackbtn: Locator;
    readonly searchFindOwner: Locator;

    constructor(page: Page) {
        this.owner = page.getByRole('button', { name: 'Owners' });
        this.addNew = page.getByRole('link', { name: 'Add New' })
        this.search = page.getByRole('link', { name: 'Search' })
        this.searchFindOwner = page.getByRole('button', { name: 'Find Owner' });
        this.addNewFName = page.locator('input[name="firstName"]');
        this.addNewLName = page.locator('input[name="lastName"]');
        this.addNewAddress = page.locator('input[name="address"]');
        this.addNewCity = page.locator('input[name="city"]');
        this.addNewTelephone = page.locator('input[name="telephone"]');
        this.addnewAddnewBtn = page.getByRole('button', { name: 'Add Owner' });
        this.addnewBackbtn = page.getByRole('button', { name: 'Back' });

    }

    async navigateToOwnersPage(): Promise<void> {
        await this.owner.click();
    }

    async filltheForm(addNewFName: string, addNewLName: string, addNewAddress: string, addNewCity: string, addNewTelephone: string): Promise<void> {
        await this.addNew.click();
        await this.addNewFName.fill(addNewFName)
        await this.addNewLName.fill(addNewLName)
        await this.addNewAddress.fill(addNewAddress)
        await this.addNewCity.fill(addNewCity)
        await this.addNewTelephone.fill(addNewTelephone)
        await this.addnewAddnewBtn.click()
    }

    async searchOwner(lastName: string): Promise<void> {
        await this.search.click()
        await this.addNewLName.fill(lastName)
        await this.searchFindOwner.click()
    }
}