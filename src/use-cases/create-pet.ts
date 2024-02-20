import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

interface AdotionRequirement {
  title: string;
}

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: number;
  size: 'PEQUENO' | 'MEDIO' | 'GRANDE';
  energy_level: number;
  independency_level: 'BAIXO' | 'MEDIO' | 'ALTO';
  environment?: string;
  city: string;
  state: string;
  organization_id: string;
  adoption_requirements?: AdotionRequirement[];
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository
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
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
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
    });

    if (adoption_requirements) {
      const adoptionRequirements = adoption_requirements.map((item) => {
        return {
          title: item.title,
          pet_id: pet.id,
        };
      });

      await this.adoptionRequirementsRepository.create(adoptionRequirements);
    }

    return { pet };
  }
}
