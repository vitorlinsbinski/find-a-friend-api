import { AdoptionRequirement, Prisma } from '@prisma/client';

export interface AdoptionRequirementsRepository {
  findManyByPetId(id: string): Promise<AdoptionRequirement[]>;

  create(
    data: Prisma.AdoptionRequirementUncheckedCreateInput[]
  ): Promise<AdoptionRequirement[]>;
}
