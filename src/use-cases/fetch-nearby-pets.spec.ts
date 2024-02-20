import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-adddresses-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { FetchNearbyPetsUseCase } from './fetch-nearby-pets';

let organizationsRepository: InMemoryOrganizationsRepository;
let addressesRepository: InMemoryAddressesRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchNearbyPetsUseCase;

describe('Fetch Nearby Pets Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    petsRepository = new InMemoryPetsRepository();

    sut = new FetchNearbyPetsUseCase(petsRepository);
  });

  it('should be able to fetch nearby pets', async () => {
    const firstOrganization = await organizationsRepository.create({
      title: 'Org. 1',
      responsible_name: 'John Doe',
      phone: '156699999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const firstOrganizationAddress = await addressesRepository.create({
      cep: '123456789',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Centro',
      street: 'Rua João Carvalho',
      number: 1248,
      organization_id: firstOrganization.id,
    });

    await petsRepository.create({
      name: 'Thor',
      about: "Thor's about",
      age: 'ADULTO',
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'BAIXO',
      city: firstOrganizationAddress.city,
      state: firstOrganizationAddress.state,
      organization_id: firstOrganization.id,
    });

    const secondOrganization = await organizationsRepository.create({
      title: 'Org. 2',
      responsible_name: 'George',
      phone: '156699999999',
      email: 'George@example.com',
      password_hash: await hash('654321', 6),
    });

    const secondOrganizationAddress = await addressesRepository.create({
      cep: '123456789',
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: 'Tijuca',
      street: 'Rua João Carvalho',
      number: 1248,
      organization_id: secondOrganization.id,
    });

    await petsRepository.create({
      name: 'Nick',
      about: "Nick's about",
      age: 'FILHOTE',
      size: 'PEQUENO',
      energy_level: 2,
      independency_level: 'BAIXO',
      city: secondOrganizationAddress.city,
      state: secondOrganizationAddress.state,
      organization_id: secondOrganization.id,
    });

    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      state: 'RJ',
    });

    expect(pets).toHaveLength(1);
    expect(pets[0].name).toEqual('Nick');
    expect(pets[0].city).toEqual('Rio de Janeiro');
    expect(pets[0].state).toEqual('RJ');
  });
});
