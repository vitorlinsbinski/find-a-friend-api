import { AdoptionRequirement, Prisma } from '@prisma/client';
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryAdoptionRequirements
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirement[] = [];

  async findManyByPetId(id: string) {
    const adoptionRequirements = this.items.filter(
      (item) => item.pet_id === id
    );

    return adoptionRequirements;
  }

  async create(data: Prisma.AdoptionRequirementUncheckedCreateInput[]) {
    const adoptionRequirements = data.map((item) => {
      const requirement = {
        id: item.id ?? randomUUID(),
        title: item.title,
        pet_id: item.pet_id,
      };

      this.items.push(requirement);

      return requirement;
    });

    return adoptionRequirements;
  }
}
