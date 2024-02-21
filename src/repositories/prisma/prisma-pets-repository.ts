import { Prisma } from '@prisma/client';
import {
  FindManyNearbyParams,
  FindManyNearbyParamsWithFilter,
  PetsRepository,
} from '../pets-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async findManyNearby({ city, state }: FindManyNearbyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        },
        state: {
          contains: state,
          mode: 'insensitive',
        },
      },
    });

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
    let where: Prisma.PetWhereInput = {
      city: {
        contains: city,
        mode: 'insensitive',
      },
      state: {
        contains: state,
        mode: 'insensitive',
      },
    };

    if (age !== undefined) {
      where.age = age;
    }

    if (energy_level !== undefined) {
      where.energy_level = energy_level;
    }

    if (independency_level !== undefined) {
      where.independency_level = independency_level;
    }

    if (size !== undefined) {
      where.size = size;
    }

    const pets = await prisma.pet.findMany({
      where,
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
