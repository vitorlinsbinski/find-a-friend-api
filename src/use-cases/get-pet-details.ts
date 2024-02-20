import { PetsRepository } from '@/repositories/pets-repository';
import { AdoptionRequirement, Pet } from '@prisma/client';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository';

interface GetPetDetailsUseCaseRequest {
  petId: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet;
  adoptionRequirements: AdoptionRequirement[];
}

export class GetPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository
  ) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const adoptionRequirements =
      await this.adoptionRequirementsRepository.findManyByPetId(petId);

    return { pet, adoptionRequirements };
  }
}
