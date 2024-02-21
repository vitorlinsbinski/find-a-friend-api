import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository';
import { GetPetDetailsUseCase } from '../get-pet-details';

export function makegetPetDetailsUseCase() {
  const prismaPetsOrganizationRepository = new PrismaPetsRepository();
  const prismaAdoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository();

  const makegetPetDetailsUseCase = new GetPetDetailsUseCase(
    prismaPetsOrganizationRepository,
    prismaAdoptionRequirementsRepository
  );

  return makegetPetDetailsUseCase;
}
