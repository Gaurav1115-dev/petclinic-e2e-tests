import { test, expect } from '@playwright/test';
import { PetTypeApi } from '../APILayer/PetTypeApi';
import testData from '../testData/pettypes.json'

test('Validate E2E scenario PetType', async ({ request }) => {
  const petTypeApi = new PetTypeApi(request);

  const createResponse = await petTypeApi.createPetType(testData.createdPetTypeName);
  expect(createResponse.ok()).toBeTruthy();

  const createdPetType: { id: number; name: string } = await createResponse.json();
  expect(createdPetType.name).toBe(testData.createdPetTypeName);

  const updatePetType = await petTypeApi.updatePetType(createdPetType.id, testData.updatedPetTypeName);
  expect(updatePetType.ok()).toBeTruthy();

  const deletePetType = await petTypeApi.deletePetType(createdPetType.id);
  expect(deletePetType.ok()).toBeTruthy();

  const remainingPetTypes: Array<{ id: number; name: string }> = await petTypeApi.getPetTypes();
  expect(remainingPetTypes).not.toContainEqual(
    expect.objectContaining({ id: createdPetType.id })
  );
});