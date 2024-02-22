import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const organization = await prisma.organization.create({
    data: {
      title: 'Seu cãopanheiro',
      responsible_name: 'John Doe',
      phone: '55669999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    },
  });
  await prisma.address.create({
    data: {
      cep: '5555555',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Rua Treze de Maio',
      number: 145,
      organization_id: organization.id,
    },
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  });

  const { token } = authResponse.body;

  return { token };
}
