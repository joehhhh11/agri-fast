import { Controller, Param, ParseIntPipe, UseGuards, Get, Post, Body, Put, Delete, Req } from '@nestjs/common';
import { PlotService } from '../services/plot.service';
import { PlotDto } from '../dto/plot.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
@Controller('plots')
@UseGuards(JwtAuthGuard)
export class PlotController {
  constructor(private readonly service: PlotService) {}

  @Post()
  create(@Body() dto: PlotDto, @Req() req: any) {
    return this.service.create(dto, req.user.fundo_id);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.user.fundo_id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: PlotDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}