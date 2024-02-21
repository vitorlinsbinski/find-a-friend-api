import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { create } from './create-controller';
import { nearby } from './nearby-controller';
import { nearbyWithFilter } from './nearby-with-filter';
import { details } from './details-controller';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create);
  app.get('/pets/nearby', nearby);
  app.get('/pets/nearby/filter', nearbyWithFilter);
  app.get('/pets/:id', details);
}
