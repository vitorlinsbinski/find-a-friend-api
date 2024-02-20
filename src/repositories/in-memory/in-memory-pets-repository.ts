import { $Enums, Pet, Prisma } from '@prisma/client';
import {
  FindManyNearbyParams,
  FindManyNearbyParamsWithFilter,
  PetsRepository,
} from '../pets-repository';
import { randomUUID } from 'crypto';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findManyNearby({ city, state }: FindManyNearbyParams) {
    const pets = this.items.filter(
      (item) => item.city === city && item.state === state
    );

    return pets;
  }

  async findManyNearbyWithFilter({
    city,
    state,
    age,
    energy_level,
    independency_level,
    size,
  }: FindManyNearbyParamsWithFilter) {
    const pets = this.items.filter((item) => {
      return (
        item.city === city &&
        item.state === state &&
        Number(item.age) === age &&
        item.energy_level === energy_level &&
        item.independency_level &&
        independency_level &&
        item.size === size
      );
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      environment: data.environment ?? null,
      city: data.city,
      state: data.state,
      organization_id: data.organization_id,
    };

    this.items.push(pet);

    return pet;
  }
}
