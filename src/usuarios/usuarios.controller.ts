import { Controller, Get, Body, Param, Put, Post, Patch } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';
import { UpdateUserInfoDto } from './dto/update-usuario.dto';
import { GuardarRutaDto } from './dto/guardar-ruta.dto';

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

  @Post(':id/guardar-ruta')
  async guardarRuta(
    @Param('id') id: string,
    @Body() ruta: GuardarRutaDto,
  ) {
    return this.usuariosService.agregarRutaGuardada(id, ruta);
  }

  @Patch(':id/actualizar-guardado/:rutaId')
  async actualizarRutaGuardada(
    @Param('id') id: string,
    @Param('rutaId') rutaId: string,
    @Body() body: Partial<GuardarRutaDto>
  ) {
    return this.usuariosService.actualizarRutaGuardada(id, rutaId, body);
  }

}
