import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Refresh Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh a token', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
