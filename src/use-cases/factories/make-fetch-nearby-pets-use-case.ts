import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { FetchNearbyPetsUseCase } from '../fetch-nearby-pets';

export function makeFetchNearbyPetsUseCase() {
  const prismaPetsOrganizationRepository = new PrismaPetsRepository();

  const fetchNearbyPetsUseCase = new FetchNearbyPetsUseCase(
    prismaPetsOrganizationRepository
  );

  return fetchNearbyPetsUseCase;
}
