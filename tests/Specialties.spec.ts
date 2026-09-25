import { test, expect } from '@playwright/test';
import { SpecialtiesApi } from '../APILayer/SpecialtiesApi';
import testData from '../testData/specialties.json';

test('Validate E2E scenario of Specialties', async ({ request }) => {
  const specialtiesapi = new SpecialtiesApi(request);

  const createResponse = await specialtiesapi.createSpecialties(testData.createdSpecialties);
  expect(createResponse.ok()).toBeTruthy();

  const createdSpecialtiesType: { id: number; name: string } = await createResponse.json();
  expect(createdSpecialtiesType.name).toBe(testData.createdSpecialties);

  const updatedSpecialties = await specialtiesapi.updateSpecialties(createdSpecialtiesType.id, testData.updatedPetSpecialties);
  expect(updatedSpecialties.ok()).toBeTruthy();

  const deleteSpecialties = await specialtiesapi.deleteSpecialties(createdSpecialtiesType.id);
  expect(deleteSpecialties.ok()).toBeTruthy();

  const remainingPetTypes: Array<{ id: number; name: string }> = await specialtiesapi.getSpecialties();
  expect(remainingPetTypes).not.toContainEqual(
    expect.objectContaining({ id: createdSpecialtiesType.id })
  );
});