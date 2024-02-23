import { PetsRepository } from '@/repositories/pets-repository';
import { AdoptionRequirement, Pet, PetImage } from '@prisma/client';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository';
import { PetImagesRepository } from '@/repositories/pet-images-repository';

interface GetPetDetailsUseCaseRequest {
  petId: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet;
  adoptionRequirements: AdoptionRequirement[];
  petImages: PetImage[];
}

export class GetPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
    private petImagesRepository: PetImagesRepository
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

    const petImages =
      await this.petImagesRepository.fetchPetImagesByPetId(petId);

    return { pet, adoptionRequirements, petImages };
  }
}
