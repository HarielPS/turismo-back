import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { CreatePlanDto } from './dto/create-plan.dto';

@Controller('planner')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  // @Post()
  // async createPlan(@Body() dto: CreatePlanDto) {
  //   return this.plannerService.generatePlanAutomatic(dto);
  // }


  @Get(':id_usuario')
  async autoPlanear(
    @Param('id_usuario') id: string,
    @Query('fecha_inicio') inicio: string,
    @Query('fecha_fin') fin: string,
  ) {
    return this.plannerService.generatePlanAutomatic(id, inicio, fin);
  }
}
