import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface createAPetProps {
  id: string;
  name: string;
}

export async function createAPet({ id, name }: createAPetProps) {
  const organization = await prisma.organization.create({
    data: {
      title: 'Seu cãopanheiro',
      responsible_name: 'John Doe',
      phone: '55669999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    },
  });

  const organizationAddress = await prisma.address.create({
    data: {
      cep: '5555555',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Rua Treze de Maio',
      number: 145,
      organization_id: organization.id,
    },
  });

  await prisma.pet.create({
    data: {
      id: id,
      name: name,
      about: `${name}'s about`,
      age: 'ADULTO',
      size: 'PEQUENO',
      energy_level: 4,
      independency_level: 'BAIXO',
      city: organizationAddress.city,
      state: organizationAddress.state,
      organization_id: organization.id,
    },
  });
}
