import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuebloService } from './pueblo.service';
import { CreatePuebloDto } from './dto/create-pueblo.dto';
import { UpdatePuebloDto } from './dto/update-pueblo.dto';

@Controller('pueblo')
export class PuebloController {
  constructor(private readonly puebloService: PuebloService) {}

  @Post()
  create(@Body() createPuebloDto: CreatePuebloDto) {
    return this.puebloService.crear(createPuebloDto);
  }

  @Get()
  findAll() {
    return this.puebloService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puebloService.obtenerPorId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuebloDto: UpdatePuebloDto) {
    return this.puebloService.actualizar(id, updatePuebloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puebloService.eliminar(id);
  }
}
