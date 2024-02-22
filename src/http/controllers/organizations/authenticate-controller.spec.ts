import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Authenticate Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate an organization', async () => {
    await request(app.server)
      .post('/organizations')
      .send({
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
      })
      .expect(201);

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('should not be able to authenticate an organization with invalid credentials', async () => {
    await request(app.server)
      .post('/organizations')
      .send({
        title: 'Org Name',
        responsible_name: 'Jack',
        phone: '55669999999',
        email: 'jack@example.com',
        password: '123456',

        cep: '5555555',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Bela Vista',
        street: 'Rua Treze de Maio',
        number: 145,
      })
      .expect(201);

    const response = await request(app.server).post('/sessions').send({
      email: 'jack@example.com',
      password: 'invalid-password',
    });

    expect(response.statusCode).toEqual(400);
  });

  it('should not be able to authenticate an noexistent organization', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'orgnotregistered@example.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(400);
  });
});
