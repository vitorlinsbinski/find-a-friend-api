import { Prisma, Pet } from '@prisma/client';

export interface FindManyNearbyParams {
  city: string;
  state: string;
}

export interface FindManyNearbyParamsWithFilter {
  city: string;
  state: string;
  age?: 'FILHOTE' | 'ADULTO' | 'IDOSO';
  energy_level?: number;
  size?: 'PEQUENO' | 'MEDIO' | 'GRANDE';
  independency_level?: 'BAIXO' | 'MEDIO' | 'ALTO';
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Pet[]>;
  findManyNearbyWithFilter(
    params: FindManyNearbyParamsWithFilter
  ): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
