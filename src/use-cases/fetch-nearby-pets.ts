import { PetsRepository } from '@/repositories/pets-repository';

interface FetchNearbyPetsUseCaseRequest {
  city: string;
  state: string;
}

interface FetchNearbyPetsUseCaseResponse {
  pets: {
    id: string;
    name: string;
    about: string;
    organization_id: string;
  }[];
}

export class FetchNearbyPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
  }: FetchNearbyPetsUseCaseRequest): Promise<FetchNearbyPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyNearby({ city, state });

    const petsFormatted = pets.map((item) => {
      const { id, name, about, organization_id } = item;

      return {
        id,
        name,
        about,
        organization_id,
      };
    });

    return { pets: petsFormatted };
  }
}
