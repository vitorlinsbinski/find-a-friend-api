import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { RegisterOrganizationUseCase } from '../register-organization';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository';
import { CreatePetUseCase } from '../create-pet';

export function makeCreatePetUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const prismaPetsOrganizationRepository = new PrismaPetsRepository();
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository();

  const registerOrganizationUseCase = new CreatePetUseCase(
    prismaPetsOrganizationRepository,
    adoptionRequirementsRepository,
    prismaOrganizationsRepository
  );

  return registerOrganizationUseCase;
}
