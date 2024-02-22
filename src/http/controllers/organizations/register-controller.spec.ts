import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register an organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      title: 'Org Name',
      responsible_name: 'John Doe',
      phone: '55669999999',
      email: 'johndoe@example.com',
      password: '123456',

      cep: '5555555',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Rua Treze de Maio',
      number: 145,
    });

    expect(response.statusCode).toEqual(201);
  });

  it('should not be able to register an organization with the same email', async () => {
    await request(app.server).post('/organizations').send({
      title: 'Org Name',
      responsible_name: 'John Doe',
      phone: '55669999999',
      email: 'johndoe@example.com',
      password: '123456',

      cep: '5555555',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Rua Treze de Maio',
      number: 145,
    });

    const response = await request(app.server).post('/organizations').send({
      title: 'Org Name',
      responsible_name: 'John Doe',
      phone: '55669999999',
      email: 'johndoe@example.com',
      password: '123456',

      cep: '5555555',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Rua Treze de Maio',
      number: 145,
    });

    expect(response.statusCode).toEqual(409);
  });
});
