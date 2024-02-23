import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case';
import { makeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().max(300),
    age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
    size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
    energy_level: z.coerce.number().int().min(1).max(5),
    independency_level: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
    environment: z.string().optional(),
    adoption_requirements: z.array(z.string()).optional(),
    cover_image_url_path: z.string(),
    images: z.array(
      z.object({
        url_path: z.string(),
      })
    ),
  });

  const {
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    adoption_requirements,
    cover_image_url_path,
    images,
  } = createPetBodySchema.parse(request.body);

  const getOrganizationProfileUseCase = makeGetOrganizationProfileUseCase();
  const createPetUseCase = makeCreatePetUseCase();

  const {
    address: { city, state },
    organization: { id },
  } = await getOrganizationProfileUseCase.execute({
    organizationId: request.user.sub,
  });

  try {
    await createPetUseCase.execute({
      name,
      about,
      age,
      size,
      energy_level,
      independency_level,
      environment: environment ?? '',
      adoption_requirements: adoption_requirements ?? [],
      city,
      state,
      organization_id: id,
      cover_image_url_path,
      images,
    });

    return reply.status(201).send();
  } catch (error) {
    throw error;
  }
}
