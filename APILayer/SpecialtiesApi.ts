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

  public async getSpecialties() {
    const response = await this.request.get(BASE_URL, {
      headers: this.headers,
    });

    return response.json();
  }

  public async createSpecialties(name: string) {
    return this.request.post(BASE_URL, {
      headers: this.headers,
      data: {
        id: null,
        name,
      },
    });
  }

  public async updateSpecialties(id: number, name: string) {
    return this.request.put(`${BASE_URL}/${id}`, {
      headers: this.headers,
      data: {
        id,
        name,
      },
    });
  }

  public async deleteSpecialties(id: number) {
    return this.request.delete(`${BASE_URL}/${id}`, {
      headers: this.headers,
    });
  }
}