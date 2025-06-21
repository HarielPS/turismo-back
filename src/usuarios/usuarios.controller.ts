import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';
import { UpdateUserInfoDto } from './dto/update-usuario.dto';


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

  // Agregar info perfil usuario
  @Put(':id/perfil')
  async updatePerfil(
    @Param('id') id: string,
    @Body() body: UpdateUserInfoDto,
  ) {
    console.log('Entró al controlador');
    console.log(`[NEST] PUT /usuarios/${id}/perfil`, body);
    return this.usuariosService.updatePerfil(id, body);
  }
}
