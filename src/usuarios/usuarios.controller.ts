import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findById(id);
  }

  @Put(':id/preferencias')
  async updatePreferencias(
    @Param('id') id: string,
    @Body() body: UpdatePreferenciasDto,
  ) {
    return this.usuariosService.updatePreferencias(id, body.preferencias);
  }
}
