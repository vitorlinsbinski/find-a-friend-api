import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { AuthenticateOrganizationUseCase } from './authenticate-organization';
import { hash } from 'bcryptjs';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-adddresses-repository';

let organizationsRepository: InMemoryOrganizationsRepository;
let addressesRepository: InMemoryAddressesRepository;
let sut: AuthenticateOrganizationUseCase;

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    addressesRepository = new InMemoryAddressesRepository();

    sut = new AuthenticateOrganizationUseCase(organizationsRepository);
  });

  it('should be able to authenticate as a organization', async () => {
    const organizationRegistered = await organizationsRepository.create({
      title: 'Organization name',
      responsible_name: 'John Doe',
      phone: '156699999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    await addressesRepository.create({
      cep: '123456789',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Centro',
      street: 'Rua João Carvalho',
      number: 1248,
      organization_id: organizationRegistered.id,
    });

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(organization.id).toEqual(expect.any(String));
  });
});
