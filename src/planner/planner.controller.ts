import { Controller, Post, Body, Get, Param, Query, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PlannerService } from './planner.service';

function sanitize(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitize);
  } else if (obj && typeof obj === 'object') {
    const cleanObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cleanObj[key] = sanitize(obj[key]);
      }
    }
    return cleanObj;
  } else if (typeof obj === 'number') {
    if (isNaN(obj)) {
      return null; // reemplaza NaN por null
    }
    if (!isFinite(obj)) {
      return null; // opcional, para Infinity e -Infinity
    }
    return obj;
  } else {
    return obj;
  }
}



@Controller('planner')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Get(':id_usuario')
  async autoPlanear(
    @Param('id_usuario') id: string,
    @Query('fecha_inicio') inicio: string,
    @Query('fecha_fin') fin: string,
    @Query('solo_hoy') soloHoy: string
  ) {
    const plan = await this.plannerService.generatePlanAutomatic(id, inicio, fin);

  // Si solo_hoy=true, devuelve solo el día actual
  if (soloHoy === 'true') {
    const hoy = new Date().toISOString().split('T')[0];
    return {
      [hoy]: plan[hoy] || {},
    };
  }

  return plan;
  }

  // planner.controller.ts
@Post()
async generarPlanPersonalizado(@Body() body: any) {
  try {
    const { id_usuario, fecha_inicio, fecha_fin, presupuesto } = body;
    
    if (!id_usuario || !fecha_inicio || !fecha_fin) {
      throw new BadRequestException('Faltan campos requeridos');
    }

    const plan = await this.plannerService.generatePlanAutomatic(
      id_usuario,
      fecha_inicio,
      fecha_fin,
      presupuesto?.[0] || undefined
    );

    const sanitizedPlan = sanitize(plan);

console.log('Respuesta que se enviará al frontend:', JSON.stringify(sanitizedPlan, null, 2));

    return JSON.parse(JSON.stringify(sanitizedPlan));

  } catch (error) {
    console.error('Error en generarPlanPersonalizado:', error);
    throw new InternalServerErrorException({
      message: 'Error al generar el plan',
      details: error.message
    });
  }
}

  
  
}
