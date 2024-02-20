import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { AuthenticateOrganizationUseCase } from './authenticate-organization';
import { hash } from 'bcryptjs';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-adddresses-repository';
import { CreatePetUseCase } from './create-pet';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository';
import { InMemoryAdoptionRequirements } from '@/repositories/in-memory/in-memory-adoption-requireements';

let organizationsRepository: InMemoryOrganizationsRepository;
let addressesRepository: InMemoryAddressesRepository;
let petsRepository: InMemoryPetsRepository;
let adoptionRequirementsRepository: AdoptionRequirementsRepository;
let sut: CreatePetUseCase;

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    petsRepository = new InMemoryPetsRepository();
    adoptionRequirementsRepository = new InMemoryAdoptionRequirements();

    sut = new CreatePetUseCase(petsRepository, adoptionRequirementsRepository);
  });

  it('should be able to create a pet', async () => {
    const organizationRegistered = await organizationsRepository.create({
      title: 'Organization name',
      responsible_name: 'John Doe',
      phone: '156699999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const organizationAddress = await addressesRepository.create({
      cep: '123456789',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Centro',
      street: 'Rua João Carvalho',
      number: 1248,
      organization_id: organizationRegistered.id,
    });

    const { pet } = await sut.execute({
      name: 'Thor',
      about: "Thor's about",
      age: 4,
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'BAIXO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organizationRegistered.id,
      adoption_requirements: [
        {
          title: 'Requirement 1',
        },
        {
          title: 'Requirement 2',
        },
        {
          title: 'Requirement 3',
        },
      ],
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual('Thor');
  });
});
