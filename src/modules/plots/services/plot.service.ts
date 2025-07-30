import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { PlotDto } from '../dto/plot.dto';
@Injectable()
export class PlotService {
  constructor(private prisma: PrismaService) {}

  async create(dto: PlotDto, farmId: number) {
    return this.prisma.plot.create({
      data: { ...dto, qrCode: crypto.randomUUID(), farmId },
    });
  }

  async findAll(farmId: number) {
    return this.prisma.plot.findMany({ where: { farmId } });
  }

  async update(id: number, dto: PlotDto) {
    return this.prisma.plot.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.plot.delete({ where: { id } });
  }
}
