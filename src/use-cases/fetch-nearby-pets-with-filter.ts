import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

interface FetchNearbyPetsWithFilterUseCaseRequest {
  city: string;
  state: string;
  age?: 'FILHOTE' | 'ADULTO' | 'IDOSO';
  energy_level?: number;
  size?: 'PEQUENO' | 'MEDIO' | 'GRANDE';
  independency_level?: 'BAIXO' | 'MEDIO' | 'GRANDE';
}

interface FetchNearbyPetsWithFilterUseCaseResponse {
  pets: Pet[];
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

    return { pets };
  }
}
