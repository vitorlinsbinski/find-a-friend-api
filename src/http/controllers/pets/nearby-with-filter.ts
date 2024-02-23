import { makeFetchNearbyPetsUseCase } from '@/use-cases/factories/make-fetch-nearby-pets-use-case';
import { makeFetchNearbyPetsWithFilterUseCase } from '@/use-cases/factories/make-fetch-nearby-pets-with-filter-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function nearbyWithFilter(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchNearbyPetsWithFilterQuerySchema = z.object({
    city: z.string(),
    state: z.string().max(2),
    age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']).optional(),
    energy_level: z.coerce.number().int().min(1).max(5).optional(),
    independency_level: z.enum(['BAIXO', 'MEDIO', 'ALTO']).optional(),
    size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']).optional(),
  });

  const { city, state, independency_level, size, age, energy_level } =
    fetchNearbyPetsWithFilterQuerySchema.parse(request.query);

  const fetchNearbyPetsUseCaseWithFilter =
    makeFetchNearbyPetsWithFilterUseCase();

  try {
    const pets = await fetchNearbyPetsUseCaseWithFilter.execute({
      city,
      state,
      age,
      energy_level,
      independency_level,
      size,
    });

    return reply.status(200).send(pets);
  } catch (error) {
    throw error;
  }
}
