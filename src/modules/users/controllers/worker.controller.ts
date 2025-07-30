import { Body, Controller, Post, UseGuards, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { WorkerService } from '../services/worker.service';
import { WorkerDto } from '../dto/worker.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
@Controller('workers')
@UseGuards(JwtAuthGuard)
export class WorkerController {
  constructor(private readonly service: WorkerService) {}

  @Post()
  create(@Body() dto: WorkerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: WorkerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}