import { test, expect } from '@playwright/test';
import ownersTestData from '../testData/oweners.json';
import { OwnerApi } from '../APILayer/OwnerApi'

for (const data of ownersTestData) {
  test(`Add Owner Test Through API- ${data.firstName} ${data.lastName}`, async ({ request }) => {
    const ownerApi = new OwnerApi(request);

    const response = await ownerApi.createOwner(data);
    expect(response.status()).toBe(201);

    const createdOwner = await response.json();

    const updatedData = ownerApi.getUpdatedOwnerData(data);
    const updateResponse = await ownerApi.updateOwner(createdOwner.id, updatedData);

    const fetchResponse = await ownerApi.fetchOwnerByLastName(data.lastName);
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
  });
}