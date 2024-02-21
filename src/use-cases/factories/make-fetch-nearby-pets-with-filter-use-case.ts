import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { FetchNearbyPetsWithFilterUseCase } from '../fetch-nearby-pets-with-filter';

export function makeFetchNearbyPetsWithFilterUseCase() {
  const prismaPetsOrganizationRepository = new PrismaPetsRepository();

  const fetchNearbyPetsWithFilterUseCase = new FetchNearbyPetsWithFilterUseCase(
    prismaPetsOrganizationRepository
  );

  return fetchNearbyPetsWithFilterUseCase;
}
