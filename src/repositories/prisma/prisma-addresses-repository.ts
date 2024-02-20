import { Prisma } from '@prisma/client';
import { AddressesRepository } from '../addresses-repository';
import { prisma } from '@/lib/prisma';

export class PrismaAddressesRepository implements AddressesRepository {
  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    return address;
  }

  async findByOrgId(organizationId: string) {
    const address = await prisma.address.findUnique({
      where: {
        organization_id: organizationId,
      },
    });

    return address;
  }

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
      data,
    });

    return address;
  }
}
