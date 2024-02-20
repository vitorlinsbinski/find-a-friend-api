import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { hash } from 'bcryptjs';
import { Organization } from '@prisma/client';
import { OrganizationAlreadyExistsError } from './erros/organization-already-exists-error';
import { AddressesRepository } from '@/repositories/addresses-repository';

interface RegisterOrganizationUseCaseRequest {
  title: string;
  responsible_name: string;
  phone: string;
  email: string;
  password: string;

  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization;
}

export class RegisterOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private addressesRepository: AddressesRepository
  ) {}

  async execute({
    title,
    responsible_name,
    phone,
    email,
    password,
    cep,
    city,
    neighborhood,
    number,
    state,
    street,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email);

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError();
    }

    const organization = await this.organizationsRepository.create({
      title,
      responsible_name,
      phone,
      email,
      password_hash,
    });

    await this.addressesRepository.create({
      cep,
      city,
      neighborhood,
      number,
      state,
      street,
      organization_id: organization.id,
    });

    return { organization };
  }
}
