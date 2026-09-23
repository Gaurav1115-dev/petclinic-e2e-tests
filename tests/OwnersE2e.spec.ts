import { test, expect,Request } from '@playwright/test';import { HomePage } from '../pageObjects/homePage';
import{OwnersPage} from '../pageObjects/ownersPage';
import ownersTestData from '../testData/oweners.json';


/*
  create a test for adding an owner using the data from the ownersTestData array. 
  The test should navigate to the owners page, fill out the form with the provided data,
  and submit it. Use a loop to iterate through each set of test data and 
  create a separate test for each one.
  Validate that the owner was added successfully by checking for a success message
  or by searching for the owner in the owners list.
*/
for (const data of ownersTestData) {
  test(`Add Owner Test - ${data.firstName} ${data.lastName}`, async ({ page }) => {
    const homePage = new HomePage(page);
    const ownersPage = new OwnersPage(page);
    await page.goto('/');
    await ownersPage.navigateToOwnersPage();
    await ownersPage.filltheForm(data.firstName, data.lastName, data.address, data.city, data.telephone);
    await ownersPage.navigateToOwnersPage();
    await ownersPage.searchOwner(data.lastName);
    await expect(page.locator('table')).toContainText(data.firstName);
  })
}
