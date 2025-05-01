import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findById(id);
  }

  @Put(':id/preferencias')
  async updatePreferencias(@Param('id') id: string, @Body() preferencias: any) {
    const usuario = await this.usuariosService.findById(id);
    usuario.preferencias = preferencias;
    return await usuario.save();
  }
}
