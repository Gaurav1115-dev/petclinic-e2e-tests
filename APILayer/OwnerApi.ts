import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://petclinic-api.bondaracademy.com/petclinic/api/owners';
export type OwnerPayload = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
};

export class OwnerApi {
    constructor(private request: APIRequestContext) { }

    private getHeaders() {
        return {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    async createOwner(owner: OwnerPayload) {
        return this.request.post(BASE_URL, {
            headers: this.getHeaders(),
            data: {
                ...owner,
                pets: [],
            },
        });
    }

    async fetchOwnerByLastName(lastName: string) {
        const response = await this.request.get(`${BASE_URL}?lastName=${lastName}`, {
            headers: this.getHeaders(),
        }); 
        return response;      
    }

    getUpdatedOwnerData(owner: OwnerPayload): OwnerPayload {
        return {
            ...owner,
            firstName: `${owner.firstName}Updated`,
            address: 'Updated Address',
        };
    }

    async updateOwner(ownerId: number, owner: OwnerPayload) {
        return this.request.put(`${BASE_URL}/${ownerId}`, {
            headers: this.getHeaders(),
            data: owner,
        });
    }
}