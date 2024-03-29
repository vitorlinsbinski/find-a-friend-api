import { FastifyInstance } from 'fastify';
import { register } from './register-controller';
import { authenticate } from './authenticate-controller';
import { profile } from './profile-controller';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { refresh } from './refresh-controller';

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register);
  app.post('/sessions', authenticate);
  app.patch('/token/refresh', refresh);
  app.get('/organizations/profile', { onRequest: [verifyJWT] }, profile);
}
