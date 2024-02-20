import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-adddresses-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { FetchNearbyPetsWithFilterUseCase } from './fetch-nearby-pets-with-filter';
import { GetPetDetailsUseCase } from './get-pet-details';

let organizationsRepository: InMemoryOrganizationsRepository;
let addressesRepository: InMemoryAddressesRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetDetailsUseCase;

describe('Fetch Nearby Pets With Filter Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    petsRepository = new InMemoryPetsRepository();

    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it('should be able to fetch nearby pets with filter', async () => {
    const organization = await organizationsRepository.create({
      title: 'Org. 1',
      responsible_name: 'John Doe',
      phone: '156699999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const organizationAddress = await addressesRepository.create({
      cep: '123456789',
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: 'Centro',
      street: 'Rua João Carvalho',
      number: 1248,
      organization_id: organization.id,
    });

    await petsRepository.create({
      id: 'pet-01',
      name: 'Thor',
      about: "Thor's about",
      age: 4,
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'BAIXO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organization.id,
    });

    await petsRepository.create({
      id: 'pet-02',
      name: 'Max',
      about: "Max's about",
      age: 2,
      size: 'MEDIO',
      energy_level: 2,
      independency_level: 'BAIXO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organization.id,
    });

    await petsRepository.create({
      id: 'pet-03',
      name: 'Jack',
      about: "Jack's about",
      age: 2,
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'MEDIO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organization.id,
    });

    const { pet } = await sut.execute({
      petId: 'pet-02',
    });

    expect(pet.id).toEqual('pet-02');
    expect(pet.name).toEqual('Max');
  });
});
