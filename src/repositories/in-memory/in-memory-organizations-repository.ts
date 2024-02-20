import { Organization, Prisma } from '@prisma/client';
import { OrganizationsRepository } from '../organizations-repository';
import { randomUUID } from 'crypto';

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = [];

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id);

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email);

    if (!organization) {
      return null;
    }

    return organization;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      title: data.title,
      responsible_name: data.responsible_name,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
    };

    this.items.push(organization);

    return organization;
  }
}
