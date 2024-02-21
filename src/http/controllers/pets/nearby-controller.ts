import { makeFetchNearbyPetsUseCase } from '@/use-cases/factories/make-fetch-nearby-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const fetchNearbyPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string().max(2),
  });

  const { city, state } = fetchNearbyPetsQuerySchema.parse(request.query);

  const fetchNearbyPetsUseCase = makeFetchNearbyPetsUseCase();

  try {
    const pets = await fetchNearbyPetsUseCase.execute({
      city,
      state,
    });

    return reply.status(200).send(pets);
  } catch (error) {
    throw error;
  }
}
