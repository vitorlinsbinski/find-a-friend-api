import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization';

describe('Create Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a pet if the organizations is authenticated', async () => {
    const { token } = await createAndAuthenticateOrganization(app);

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Thor',
        about: "Thor's about",
        age: 'ADULTO',
        size: 'PEQUENO',
        energy_level: 4,
        independency_level: 'BAIXO',
        adoption_requirements: [
          'requirement 1',
          'requirement 2',
          'requirement 3',
        ],
        cover_image_url_path: './thor_cover.png',
        images: [
          {
            url_path: './thor_img_01.png',
          },
          {
            url_path: './thor_img_01.png',
          },
        ],
      });

    expect(response.statusCode).toEqual(201);
  });

  it('should not be able to create a pet if the organizations is not authenticated', async () => {
    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Thor',
        about: "Thor's about",
        age: 'ADULTO',
        size: 'PEQUENO',
        energy_level: 4,
        independency_level: 'BAIXO',
        adoption_requirements: [
          'requirement 1',
          'requirement 2',
          'requirement 3',
        ],
      });

    expect(response.statusCode).toEqual(401);
  });
});
