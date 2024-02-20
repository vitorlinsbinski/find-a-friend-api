import { OrganizationAddressAlreadyExistsError } from '@/use-cases/erros/organization-address-already-exists-error';
import { OrganizationAlreadyExistsError } from '@/use-cases/erros/organization-already-exists-error';
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    responsible_name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),

    cep: z.string(),
    state: z.string().max(2),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    number: z.coerce.number(),
  });

  const {
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
  } = registerBodySchema.parse(request.body);

  const registerOrganizationUseCase = makeRegisterOrganizationUseCase();

  try {
    await registerOrganizationUseCase.execute({
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
    });
  } catch (error) {
    if (
      error instanceof OrganizationAlreadyExistsError ||
      error instanceof OrganizationAddressAlreadyExistsError
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
