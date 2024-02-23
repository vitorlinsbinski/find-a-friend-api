import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-adddresses-repository';
import { CreatePetUseCase } from './create-pet';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository';
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requirements-repository';
import { NonExistingOrganizationError } from './erros/nonexisting-organization-error';
import { PetImagesRepository } from '@/repositories/pet-images-repository';
import { InMemoryPetImagesRepository } from '@/repositories/in-memory/in-memory-pet-images-repository';

let organizationsRepository: InMemoryOrganizationsRepository;
let addressesRepository: InMemoryAddressesRepository;
let petsRepository: InMemoryPetsRepository;
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let petImagesRepository: InMemoryPetImagesRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    petsRepository = new InMemoryPetsRepository();
    petImagesRepository = new InMemoryPetImagesRepository();
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository();

    sut = new CreatePetUseCase(
      petsRepository,
      adoptionRequirementsRepository,
      petImagesRepository,
      organizationsRepository
    );
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
      age: 'ADULTO',
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'BAIXO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organizationRegistered.id,
      adoption_requirements: [
        'requirement 1',
        'requirement 2',
        'requirement 3',
      ],
      cover_image_url_path: './dog_cover.png',
      images: [
        { url_path: './dog_01.png' },
        { url_path: './dog_01.png' },
        { url_path: './dog_01.png' },
      ],
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual('Thor');
  });

  it('should not be able to create a pet without a organizaiton registered', async () => {
    await expect(() =>
      sut.execute({
        name: 'Thor',
        about: "Thor's about",
        age: 'FILHOTE',
        size: 'PEQUENO',
        energy_level: 4,
        independency_level: 'BAIXO',
        city: 'São Paulo',
        state: 'SP',
        organization_id: 'nonexisting-org-id',
        cover_image_url_path: './dog_cover.png',
        images: [
          { url_path: './dog_01.png' },
          { url_path: './dog_01.png' },
          { url_path: './dog_01.png' },
        ],
      })
    ).rejects.toBeInstanceOf(NonExistingOrganizationError);
  });
});
