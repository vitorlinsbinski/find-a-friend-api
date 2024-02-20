import fastify from 'fastify';
import { organizationsRoutes } from './http/controllers/organizations/routes';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(organizationsRoutes);
