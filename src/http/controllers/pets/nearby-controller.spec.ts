import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createPets } from '@/utils/test/create-pets';

describe('Nearby Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get pets nearby', async () => {
    await createPets();

    const response = await request(app.server)
      .get('/pets/nearby')
      .query({ city: 'São Paulo', state: 'SP' })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        id: 'pet-01',
      }),
      expect.objectContaining({
        id: 'pet-02',
      }),
    ]);
  });
});
