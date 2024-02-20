import { Address, Prisma } from '@prisma/client';

export interface AddressesRepository {
  findById(id: string): Promise<Address | null>;

  findByOrgId(id: string): Promise<Address | null>;

  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>;
}
