import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository';
import { GetPetDetailsUseCase } from '../get-pet-details';
import { PrismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository';

export function makegetPetDetailsUseCase() {
  const prismaPetsOrganizationRepository = new PrismaPetsRepository();
  const prismaAdoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository();
  const prismaPetImagesRepository = new PrismaPetImagesRepository();

  const makegetPetDetailsUseCase = new GetPetDetailsUseCase(
    prismaPetsOrganizationRepository,
    prismaAdoptionRequirementsRepository,
    prismaPetImagesRepository
  );

  return makegetPetDetailsUseCase;
}
