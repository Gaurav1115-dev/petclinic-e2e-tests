import { test, expect } from '@playwright/test';
import { PetTypeApi } from '../APILayer/PetTypeApi';
import testData from '../testData/specialties.json'

test('Validate E2E scenario of Specialties', async ({ request }) => {
  const petTypeApi = new PetTypeApi(request);

  const createResponse = await petTypeApi.createPetType(testData.createdSpecialties);
  expect(createResponse.ok()).toBeTruthy();

  const createdSpecialtiesType: { id: number; name: string } = await createResponse.json();
  expect(createdSpecialtiesType.name).toBe(testData.createdSpecialties);

  const updatedSpecialties = await petTypeApi.updatePetType(createdSpecialtiesType.id, testData.updatedPetSpecialties);
  expect(updatedSpecialties.ok()).toBeTruthy();

  const deleteSpecialties = await petTypeApi.deletePetType(createdSpecialtiesType.id);
  expect(deleteSpecialties.ok()).toBeTruthy();

  const remainingPetTypes: Array<{ id: number; name: string }> = await petTypeApi.getPetTypes();
  expect(remainingPetTypes).not.toContainEqual(
    expect.objectContaining({ id: createdSpecialtiesType.id })
  );
});