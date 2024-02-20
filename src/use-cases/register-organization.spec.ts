import { RegisterOrganizationUseCase } from './register-organization';
import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryAddressesRepository } from '../repositories/in-memory/in-memory-adddresses-repository';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';

let organizationsRepository: InMemoryOrganizationsRepository;
let addressesRepository: InMemoryAddressesRepository;
let sut: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    addressesRepository = new InMemoryAddressesRepository();

    sut = new RegisterOrganizationUseCase(
      organizationsRepository,
      addressesRepository
    );
  });

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      title: 'Organization name',
      responsible_name: 'John Doe',
      phone: '156699999999',
      email: 'johndoe@example.com',
      password: '123456',

      cep: '123456789',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Centro',
      street: 'Rua João Carvalho',
      number: 1248,
    });

    expect(organization.id).toEqual(expect.any(String));
  });
});
