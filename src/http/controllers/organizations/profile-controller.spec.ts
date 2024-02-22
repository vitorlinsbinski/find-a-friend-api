import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization';

describe('Profile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get organization profile', async () => {
    const { token } = await createAndAuthenticateOrganization(app);

    const profileResponse = await request(app.server)
      .get('/organizations/profile')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.organization).toEqual(
      expect.objectContaining({
        title: 'Seu cãopanheiro',
        email: 'johndoe@example.com',
      })
    );
  });
});
