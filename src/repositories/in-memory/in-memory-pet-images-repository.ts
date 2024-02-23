import { PetImage, Prisma } from '@prisma/client';
import { PetImagesRepository } from '../pet-images-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPetImagesRepository implements PetImagesRepository {
  public items: PetImage[] = [];

  async fetchPetImagesByPetId(id: string) {
    const petImages = await this.items.filter((item) => item.pet_id === id);

    return petImages;
  }

  async createMany(images: Prisma.PetImageUncheckedCreateInput[]) {
    images.forEach((image) => {
      this.items.push({
        id: image.id ?? randomUUID(),
        url_path: image.url_path,
        pet_id: image.pet_id,
      });
    });

    return;
  }
}
