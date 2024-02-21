import { PetsRepository } from '@/repositories/pets-repository';

interface FetchNearbyPetsWithFilterUseCaseRequest {
  city: string;
  state: string;
  age?: 'FILHOTE' | 'ADULTO' | 'IDOSO';
  energy_level?: number;
  size?: 'PEQUENO' | 'MEDIO' | 'GRANDE';
  independency_level?: 'BAIXO' | 'MEDIO' | 'ALTO';
}

interface FetchNearbyPetsWithFilterUseCaseResponse {
  pets: {
    id: string;
    name: string;
    about: string;
    organization_id: string;
  }[];
}

export class FetchNearbyPetsWithFilterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
    age,
    energy_level,
    independency_level,
    size,
  }: FetchNearbyPetsWithFilterUseCaseRequest): Promise<FetchNearbyPetsWithFilterUseCaseResponse> {
    const pets = await this.petsRepository.findManyNearbyWithFilter({
      city,
      state,
      age,
      energy_level,
      independency_level,
      size,
    });

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
