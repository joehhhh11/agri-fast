import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Ejecutando seed...');

  // 1. Seed de Roles
  const roles = ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'SUPERVISOR', 'WORKER'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  // 2. Seed de Farm
  let farm = await prisma.farm.findFirst({
    where: { ruc: '12345678901' },
  });

  if (!farm) {
    farm = await prisma.farm.create({
      data: {
        name: 'Fundo Santa Rosa',
        ruc: '12345678901',
        address: 'Carretera Central KM 22',
      },
    });
  }

  // 3. Seed de Usuario admin (opcional)
  const platformAdminRole = await prisma.role.findUnique({
    where: { name: 'PLATFORM_ADMIN' },
  });

  const adminEmail = 'admin@admin.com';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin && platformAdminRole) {
    await prisma.user.create({
      data: {
        name: 'Administrador General',
        email: adminEmail,
        password: await bcrypt.hash('admin123', 10),
        dni: '00000000',
        roleId: platformAdminRole.id,
        farmId: farm.id,
      },
    });
  }

  // 4. Seed de Lotes (Plots)
  const plotsData = [
    {
      name: 'Lote A',
      cropType: 'Uva',
      location: 'Sector 1',
      qrCode: 'QR-LOTE-A',
      farmId: farm.id,
    },
    {
      name: 'Lote B',
      cropType: 'Mandarina',
      location: 'Sector 2',
      qrCode: 'QR-LOTE-B',
      farmId: farm.id,
    },
    {
      name: 'Lote C',
      cropType: 'Arándano',
      location: 'Sector 3',
      qrCode: 'QR-LOTE-C',
      farmId: farm.id,
    },
  ];

  for (const plot of plotsData) {
    await prisma.plot.upsert({
      where: { qrCode: plot.qrCode },
      update: {},
      create: plot,
    });
  }

  // 5. Seed de Trabajadores
  const workersData = [
    {
      name: 'Juan Pérez',
      dni: '12345678',
      phone: '987654321',
      address: 'Calle 1',
      qrCode: 'QR-JUANPEREZ',
    },
    {
      name: 'María Gómez',
      dni: '87654321',
      phone: '912345678',
      address: 'Calle 2',
      qrCode: 'QR-MARIAGOMEZ',
    },
    {
      name: 'Luis Torres',
      dni: '56781234',
      phone: '998877665',
      address: 'Calle 3',
      qrCode: 'QR-LUISTORRES',
    },
  ];

  for (const worker of workersData) {
    await prisma.worker.upsert({
      where: { qrCode: worker.qrCode },
      update: {},
      create: worker,
    });
  }

  console.log('✅ Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
