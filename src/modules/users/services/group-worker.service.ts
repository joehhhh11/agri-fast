import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
@Injectable()
export class GroupWorkerService {
  constructor(private prisma: PrismaService) {}

  async assign(groupId: number, workerIds: number[]) {
    const data = workerIds.map(workerId => ({ groupId, workerId }));
    return this.prisma.groupWorker.createMany({ data, skipDuplicates: true });
  }

  async remove(groupId: number, workerId: number) {
    return this.prisma.groupWorker.delete({
      where: { groupId_workerId: { groupId, workerId } },
    });
  }
}
