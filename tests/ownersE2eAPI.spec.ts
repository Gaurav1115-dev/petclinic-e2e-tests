import { test, expect } from '@playwright/test';
import ownersTestData from '../testData/oweners.json';
import { OwnerApi } from '../APILayer/owenerapi';

// Create an OwnerApi instance and add a new owner using the data from ownersTestData.
// Fetch the newly created owner by last name and validate that the returned owner details match the created record.

for (const data of ownersTestData) {

    test(`add owners using API and Fetch owner Deatils of the API- ${data.firstName} ${data.lastName}`, async ({ request }) => {

        const ownerapi = new OwnerApi(request);
        const response = await ownerapi.createOwner(data);
        expect(response.status()).toBe(201);
        const createdOwner = await response.json();

        const updatedData = ownerapi.getUpdatedOwnerData(data);
        const updateResponse = await ownerapi.updateOwner(createdOwner.id, updatedData);

        const fetchResponse = await ownerapi.fetchOwnerByLastName(data.lastName);
        expect(fetchResponse.status()).toBe(200);
        const owners = await fetchResponse.json();
        expect(owners).toContainEqual(
            expect.objectContaining({
                id: createdOwner.id,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
                address: updatedData.address,
                city: updatedData.city,
                telephone: updatedData.telephone,
            })
        );
    })
}