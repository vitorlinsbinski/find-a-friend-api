import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { RegisterOrganizationUseCase } from '../register-organization';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';

export function makeRegisterOrganizationUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const prismaAddressesRepository = new PrismaAddressesRepository();

  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    prismaOrganizationsRepository,
    prismaAddressesRepository
  );

  return registerOrganizationUseCase;
}
