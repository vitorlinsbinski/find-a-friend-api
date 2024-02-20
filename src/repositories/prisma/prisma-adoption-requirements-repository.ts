import { AdoptionRequirement, Prisma } from '@prisma/client';
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository';
import { prisma } from '@/lib/prisma';

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async findManyByPetId(id: string) {
    const adoptionRequirements = await prisma.adoptionRequirement.findMany({
      where: {
        pet_id: id,
      },
    });

    return adoptionRequirements;
  }

  async create(data: Prisma.AdoptionRequirementUncheckedCreateInput[]) {
    const adoptionRequirements = await prisma.$queryRaw<AdoptionRequirement[]>`
    INSERT INTO "AdoptionRequirement" ("title", "pet_id")
    VALUES ${data.map((d) => `('${d.title}', '${d.pet_id}')`).join(',')}
  `;

    return adoptionRequirements;
  }
}
