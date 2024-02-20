import { FastifyInstance } from 'fastify';
import { register } from './register-controller';

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register);
}
