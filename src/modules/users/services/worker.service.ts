import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { WorkerDto } from '../dto/worker.dto';
@Injectable()
export class WorkerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: WorkerDto) {
    return this.prisma.worker.create({
      data: { ...dto, qrCode: crypto.randomUUID() },
    });
  }

  async findAll() {
    return this.prisma.worker.findMany({
      where: { deletedAt: null },
    });
  }

  async update(id: number, dto: WorkerDto) {
    return this.prisma.worker.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.worker.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
