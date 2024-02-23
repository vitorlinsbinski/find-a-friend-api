import { Prisma } from '@prisma/client';
import { PetImagesRepository } from '../pet-images-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetImagesRepository implements PetImagesRepository {
  async fetchPetImagesByPetId(id: string) {
    const petImages = await prisma.petImage.findMany({
      where: {
        pet_id: id,
      },
    });

    return petImages;
  }

  async createMany(images: Prisma.PetImageUncheckedCreateInput[]) {
    await prisma.petImage.createMany({
      data: images,
    });
  }
}
