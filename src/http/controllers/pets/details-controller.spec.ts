import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization';
import { createAPet } from '@/utils/test/create-a-pet';

describe('Details Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get pet details', async () => {
    const petId = 'pet-01';
    const petName = 'Thor';
    await createAPet({ id: petId, name: petName });

    const response = await request(app.server).get('/pets/pet-01');

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: petId,
        name: petName,
      })
    );
  });
});
