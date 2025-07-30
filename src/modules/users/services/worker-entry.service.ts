import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateWorkEntryDto } from '../dto/work-entry.dto';

@Injectable()
export class WorkEntryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkEntryDto) {
    const workEntry = await this.prisma.workEntry.create({
      data: {
        type: dto.type,
        paymentType: dto.paymentType,
        date: dto.date,
        workerId: dto.workerId,
        groupId: dto.groupId,
        plotId: dto.plotId,
      },
    });

    if (dto.paymentType === 'DAILY') {
      await this.prisma.dailyWork.create({
        data: { workEntryId: workEntry.id, present: dto.present ?? true },
      });
    } else if (dto.paymentType === 'PIECEWORK') {
      await this.prisma.piecework.create({
        data: {
          workEntryId: workEntry.id,
          quantity: dto.quantity ?? 0,
          unit: dto.unit ?? 'unit',
        },
      });
    }

    return workEntry;
  }

  async findMany(params: {
    date?: string;
    groupId?: number;
    workerId?: number;
  }) {
    return this.prisma.workEntry.findMany({
      where: {
        ...(params.date && { date: new Date(params.date) }),
        ...(params.groupId && { groupId: params.groupId }),
        ...(params.workerId && { workerId: params.workerId }),
      },
      include: { dailyWork: true, piecework: true },
    });
  }
}