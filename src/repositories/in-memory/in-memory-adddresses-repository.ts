import { Address, Prisma } from '@prisma/client';
import { AddressesRepository } from '../addresses-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = [];

  async findById(id: string) {
    const address = this.items.find((item) => item.id === id);

    if (!address) {
      return null;
    }

    return address;
  }

  async findByOrgId(organizationId: string) {
    const address = this.items.find(
      (item) => item.organization_id === organizationId
    );

    if (!address) {
      return null;
    }

    return address;
  }

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: randomUUID(),
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,

      organization_id: data.organization_id,
    };

    this.items.push(address);

    return address;
  }
}
