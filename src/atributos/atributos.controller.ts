import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { AtributosService } from './atributos.service';
import { Atributo } from './schemas/atributo.schema';
import { CreateAtributoDto } from './dto/create-atributo.dto';

@Controller('atributos')
export class AtributosController {
  constructor(private readonly atributosService: AtributosService) {}

  @Post()
  crear(@Body() data: CreateAtributoDto) {
    const transformedData = {
      ...data,
      padre: data.padre ? new ObjectId(data.padre) : null,
    };
    return this.atributosService.crear(transformedData);
  }

  @Get()
  obtenerTodos() {
    return this.atributosService.obtenerTodos();
  }

  @Get('nivel/:nivel')
  obtenerPorNivel(@Param('nivel') nivel: string) {
    return this.atributosService.obtenerPorNivel(Number(nivel));
  }

  @Get('padre/:idPadre')
  obtenerPorPadre(@Param('idPadre') idPadre: string) {
    return this.atributosService.obtenerPorPadre(idPadre);
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.atributosService.obtenerPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() data: Partial<Atributo>) {
    return this.atributosService.actualizar(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.atributosService.eliminar(id);
  }
}
