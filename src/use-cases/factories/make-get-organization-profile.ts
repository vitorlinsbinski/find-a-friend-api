import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { GetOrganizationProfileUseCase } from '../get-organization-profile';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';

export function makeGetOrganizationProfileUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const prismaAddressesRepository = new PrismaAddressesRepository();

  const getOrganizationProfileUseCase = new GetOrganizationProfileUseCase(
    prismaOrganizationsRepository,
    prismaAddressesRepository
  );

  return getOrganizationProfileUseCase;
}
