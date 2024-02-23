import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { RegisterOrganizationUseCase } from '../register-organization';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository';
import { CreatePetUseCase } from '../create-pet';
import { PrismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository';

export function makeCreatePetUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const prismaPetsOrganizationRepository = new PrismaPetsRepository();
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository();
  const petImagesRepository = new PrismaPetImagesRepository();

  const registerOrganizationUseCase = new CreatePetUseCase(
    prismaPetsOrganizationRepository,
    adoptionRequirementsRepository,
    petImagesRepository,
    prismaOrganizationsRepository
  );

  return registerOrganizationUseCase;
}
