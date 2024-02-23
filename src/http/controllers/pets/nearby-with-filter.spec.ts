import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createPets } from '@/utils/test/create-pets';

describe('Nearby With Filter Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get pets  with filter', async () => {
    await createPets();

    const response = await request(app.server)
      .get('/pets/nearby/filter')
      .query({
        city: 'Rio de Janeiro',
        state: 'RJ',
        age: 'IDOSO',
        size: 'MEDIO',
        energy_level: 2,
        independency_level: 'BAIXO',
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(3);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        id: 'pet-03',
      }),
      expect.objectContaining({
        id: 'pet-04',
      }),
      expect.objectContaining({
        id: 'pet-05',
      }),
    ]);
  });
});
