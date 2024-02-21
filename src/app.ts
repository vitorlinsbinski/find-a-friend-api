import fastify from 'fastify';
import { organizationsRoutes } from './http/controllers/organizations/routes';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { env } from './env';
import { petsRoutes } from './http/controllers/pets/routes';
import { ZodError } from 'zod';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(organizationsRoutes);

app.register(petsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error.', issues: error.format() });
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});
