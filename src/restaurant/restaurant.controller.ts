import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { RestauranteService } from './restaurant.service';
import { CreateRestauranteDto } from './dto/create-restaurant.dto';
import { Restaurante } from './schema/restaurant.schema';

@Controller('restaurantes')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Post()
  async create(
    @Body() createRestauranteDto: CreateRestauranteDto,
  ): Promise<Restaurante> {
    return this.restauranteService.create(createRestauranteDto);
  }

  @Get()
  async findAll(): Promise<Restaurante[]> {
    return this.restauranteService.findAll();
  }

  @Get('buscar')
  async findByUbicacion(
    @Query('ubicacion') ubicacion: string,
  ): Promise<Restaurante[]> {
    return this.restauranteService.findByUbicacion(ubicacion);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Restaurante> {
    const restaurante = await this.restauranteService.findById(id);
    if (!restaurante) {
      throw new Error('Restaurante not found');
    }
    return restaurante;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestauranteDto: Partial<CreateRestauranteDto>,
  ): Promise<Restaurante> {
    const updated = await this.restauranteService.update(id, updateRestauranteDto);
    if (!updated) {
      throw new Error('Restaurante not found');
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Restaurante> {
    const deleted = await this.restauranteService.delete(id);
    if (!deleted) {
      throw new Error('Restaurante not found');
    }
    return deleted;
  }
}