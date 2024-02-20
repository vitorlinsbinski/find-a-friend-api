import { Prisma, Pet } from '@prisma/client';

export interface FindManyNearbyParams {
  city: string;
  state: string;
}

export interface FindManyNearbyParamsWithFilter extends FindManyNearbyParams {
  filters?: {
    age: number;
    energy_level: number;
    size: 'PEQUENO' | 'MEDIO' | 'GRANDE';
    independency_level: 'BAIXO' | 'MEDIO' | 'GRANDE';
  };
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Pet[]>;
  findManyNearbyWithFilter(params: FindManyNearbyParams): Promise<Pet[]>;
  create(data: Prisma.PetCreateInput): Promise<Pet>;
}
