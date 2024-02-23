import { PetImage, Prisma } from '@prisma/client';

export interface PetImagesRepository {
  fetchPetImagesByPetId(id: string): Promise<PetImage[]>;
  createMany(images: Prisma.PetImageUncheckedCreateInput[]): Promise<void>;
}
