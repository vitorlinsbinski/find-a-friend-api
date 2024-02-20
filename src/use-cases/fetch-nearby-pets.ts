import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

interface FetchNearbyPetsUseCaseRequest {
  city: string;
  state: string;
}

interface FetchNearbyPetsUseCaseResponse {
  pets: Pet[];
}

export class FetchNearbyPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
  }: FetchNearbyPetsUseCaseRequest): Promise<FetchNearbyPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyNearby({ city, state });

    return { pets };
  }
}
