import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';
import { NonExistingOrganizationError } from './erros/nonexisting-organization-error';
import { PetImagesRepository } from '@/repositories/pet-images-repository';

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: 'FILHOTE' | 'ADULTO' | 'IDOSO';
  size: 'PEQUENO' | 'MEDIO' | 'GRANDE';
  energy_level: number;
  independency_level: 'BAIXO' | 'MEDIO' | 'ALTO';
  environment?: string;
  city: string;
  state: string;
  organization_id: string;
  adoption_requirements?: string[];
  cover_image_url_path: string;
  images: {
    url_path: string;
  }[];
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
    private petImagesRepository: PetImagesRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    city,
    state,
    organization_id,
    adoption_requirements,
    cover_image_url_path,
    images,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organization_id);

    if (!organization) {
      throw new NonExistingOrganizationError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      independency_level,
      environment,
      city,
      state,
      organization_id,
      cover_image_url_path,
    });

    if (adoption_requirements) {
      const adoptionRequirements = adoption_requirements.map((item) => {
        return {
          title: item,
          pet_id: pet.id,
        };
      });

      await this.adoptionRequirementsRepository.create(adoptionRequirements);
    }

    const petImages = images.map((image) => {
      return {
        url_path: image.url_path,
        pet_id: pet.id,
      };
    });

    await this.petImagesRepository.createMany(petImages);

    return { pet };
  }
}
