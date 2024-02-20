import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { Address, Organization } from '@prisma/client';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { AddressesRepository } from '@/repositories/addresses-repository';

interface GetOrganizationProfileUseCaseRequest {
  organizationId: string;
}

interface GetOrganizationProfileUseCaseResponse {
  organization: Organization;
  address: Address;
}

export class GetOrganizationProfileUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private addressesRepository: AddressesRepository
  ) {}

  async execute({
    organizationId,
  }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const address = await this.addressesRepository.findByOrgId(organization.id);

    if (!address) {
      throw new ResourceNotFoundError();
    }

    return { organization, address };
  }
}
