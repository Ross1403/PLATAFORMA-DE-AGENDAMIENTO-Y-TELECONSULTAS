
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear doctores de ejemplo
  const doctor1 = await prisma.doctor.create({
    data: {
      nombres: 'Carlos',
      apellidos: 'Mendoza',
      especialidad: 'Medicina General',
      numeroLicencia: 'MED001',
      telefono: '987654321',
      correo: 'carlos.mendoza@telesalud.com'
    }
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      nombres: 'Ana',
      apellidos: 'Rodriguez',
      especialidad: 'Cardiología',
      numeroLicencia: 'MED002',
      telefono: '987654322',
      correo: 'ana.rodriguez@telesalud.com'
    }
  });

  console.log('Doctores creados:', { doctor1, doctor2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
