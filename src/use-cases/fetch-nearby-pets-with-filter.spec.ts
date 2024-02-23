import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-adddresses-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { FetchNearbyPetsWithFilterUseCase } from './fetch-nearby-pets-with-filter';

let organizationsRepository: InMemoryOrganizationsRepository;
let addressesRepository: InMemoryAddressesRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchNearbyPetsWithFilterUseCase;

describe('Fetch Nearby Pets With Filter Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    petsRepository = new InMemoryPetsRepository();

    sut = new FetchNearbyPetsWithFilterUseCase(petsRepository);
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
      name: 'Thor',
      about: "Thor's about",
      age: 'ADULTO',
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'BAIXO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organization.id,
      cover_image_url_path: 'cover_img.png',
    });

    await petsRepository.create({
      name: 'Max',
      about: "Max's about",
      age: 'FILHOTE',
      size: 'MEDIO',
      energy_level: 2,
      independency_level: 'BAIXO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organization.id,
      cover_image_url_path: 'cover_img.png',
    });

    await petsRepository.create({
      name: 'Jack',
      about: "Jack's about",
      age: 'FILHOTE',
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'MEDIO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organization.id,
      cover_image_url_path: 'cover_img.png',
    });

    const { pets } = await sut.execute({
      city: organizationAddress.city,
      state: organizationAddress.state,
      size: 'PEQUENO',
    });

    expect(pets).toHaveLength(2);
    expect(pets[0].name).toEqual('Thor');
    expect(pets[1].name).toEqual('Jack');
  });
});
