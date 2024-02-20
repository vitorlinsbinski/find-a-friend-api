import { OrganizationAddressAlreadyExistsError } from '@/use-cases/erros/organization-address-already-exists-error';
import { OrganizationAlreadyExistsError } from '@/use-cases/erros/organization-already-exists-error';
import { makeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile';
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = makeGetOrganizationProfileUseCase();

  try {
    const { organization, address } = await getOrganizationProfile.execute({
      organizationId: request.user.sub,
    });

    return reply.status(200).send({
      organization: {
        ...organization,
        address: {
          ...address,
          organization_id: undefined,
        },
        password_hash: undefined,
      },
    });
  } catch (error) {
    throw error;
  }
}
