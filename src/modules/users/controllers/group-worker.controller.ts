import { Body, Controller, Post, UseGuards, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { GroupWorkerService } from '../services/group-worker.service';


@Controller('groups/:groupId/workers')
@UseGuards(JwtAuthGuard)
export class GroupWorkerController {
  constructor(private readonly service: GroupWorkerService) {}

  @Post()
  assign(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() body: { workerIds: number[] },
  ) {
    return this.service.assign(groupId, body.workerIds);
  }

  @Delete(':workerId')
  remove(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('workerId', ParseIntPipe) workerId: number,
  ) {
    return this.service.remove(groupId, workerId);
  }
}