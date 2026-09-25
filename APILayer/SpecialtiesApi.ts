import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://petclinic-api.bondaracademy.com/petclinic/api/specialties';

export class SpecialtiesApi {
  constructor(private readonly request: APIRequestContext) {}

  private get headers() {
    return {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  public async getPetTypes() {
    const response = await this.request.get(BASE_URL, {
      headers: this.headers,
    });

    return response.json();
  }

  public async createPetType(name: string) {
    return this.request.post(BASE_URL, {
      headers: this.headers,
      data: {
        id: null,
        name,
      },
    });
  }

  public async updatePetType(id: number, name: string) {
    return this.request.put(`${BASE_URL}/${id}`, {
      headers: this.headers,
      data: {
        id,
        name,
      },
    });
  }

  public async deletePetType(id: number) {
    return this.request.delete(`${BASE_URL}/${id}`, {
      headers: this.headers,
    });
  }
}