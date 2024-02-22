import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function createPets() {
  const firstOrg = await prisma.organization.create({
    data: {
      title: 'Seu cãopanheiro',
      responsible_name: 'John Doe',
      phone: '55669999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    },
  });

  const firstOrgAddress = await prisma.address.create({
    data: {
      cep: '5555555',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Rua Treze de Maio',
      number: 145,
      organization_id: firstOrg.id,
    },
  });

  await prisma.pet.create({
    data: {
      id: 'pet-01',
      name: 'Thor',
      about: `Thor's about`,
      age: 'FILHOTE',
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'BAIXO',
      city: firstOrgAddress.city,
      state: firstOrgAddress.state,
      organization_id: firstOrg.id,
    },
  });

  await prisma.pet.create({
    data: {
      id: 'pet-02',
      name: 'Bella',
      about: `Bella's about`,
      age: 'IDOSO',
      size: 'PEQUENO',
      energy_level: 1,
      independency_level: 'BAIXO',
      city: firstOrgAddress.city,
      state: firstOrgAddress.state,
      organization_id: firstOrg.id,
    },
  });

  const secondOrg = await prisma.organization.create({
    data: {
      title: 'Animalia',
      responsible_name: 'Mary',
      phone: '55669999999',
      email: 'Mary@example.com',
      password_hash: await hash('123456', 6),
    },
  });

  const secondOrgAddress = await prisma.address.create({
    data: {
      cep: '5555555',
      state: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: 'Tijuca',
      street: 'Rua X',
      number: 157,
      organization_id: secondOrg.id,
    },
  });

  await prisma.pet.create({
    data: {
      id: 'pet-03',
      name: 'Luna',
      about: `Luna's about`,
      age: 'IDOSO',
      size: 'MEDIO',
      energy_level: 2,
      independency_level: 'BAIXO',
      city: secondOrgAddress.city,
      state: secondOrgAddress.state,
      organization_id: secondOrg.id,
    },
  });

  await prisma.pet.create({
    data: {
      id: 'pet-04',
      name: 'Cooper',
      about: `Cooper's about`,
      age: 'IDOSO',
      size: 'MEDIO',
      energy_level: 2,
      independency_level: 'BAIXO',
      city: secondOrgAddress.city,
      state: secondOrgAddress.state,
      organization_id: secondOrg.id,
    },
  });

  await prisma.pet.create({
    data: {
      id: 'pet-05',
      name: 'Charlie',
      about: `Charlie's about`,
      age: 'IDOSO',
      size: 'MEDIO',
      energy_level: 2,
      independency_level: 'BAIXO',
      city: secondOrgAddress.city,
      state: secondOrgAddress.state,
      organization_id: secondOrg.id,
    },
  });
}
