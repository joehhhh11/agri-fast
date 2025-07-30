import { Controller, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
import { WorkEntryService } from '../services/worker-entry.service';
import { CreateWorkEntryDto } from '../dto/work-entry.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('work-entries')
@UseGuards(JwtAuthGuard)
export class WorkEntryController {
  constructor(private readonly service: WorkEntryService ) {}

  @Post()
  create(@Body() dto: CreateWorkEntryDto) {
    return this.service.create(dto);
  }

  @Get()
  find(@Query() query: any) {
    return this.service.findMany(query);
  }
}