import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { ObjectId } from 'mongodb';
import { UpdateUserInfoDto } from './dto/update-usuario.dto';
import { GuardarRutaDto } from './dto/guardar-ruta.dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async findById(id: string) {
    const usuario = await this.usuarioModel.findById(id).select('-pass_viajero');
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async updatePreferencias(id: string, preferencias: UpdatePreferenciasDto['preferencias']) {
    const preferenciasConObjectId = preferencias.map((pref) => ({
      atributoID: new ObjectId(pref.atributoID),
      conteo: pref.conteo,
    }));
  
    return this.usuarioModel.findByIdAndUpdate(
      id,
      { preferencias: preferenciasConObjectId },
      { new: true }
    );
  }

  async updatePerfil(id: string, updateData: UpdateUserInfoDto) {
    console.log('Datos a actualizar (desde nest service):', updateData);
    const usuarioActualizado = await this.usuarioModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );

    if (!usuarioActualizado) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuarioActualizado;
  }

  async agregarRutaGuardada(userId: string, ruta: GuardarRutaDto) {
    const usuario = await this.usuarioModel.findById(userId);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.guardado.push(ruta as any); // puedes usar cast o tipar correctamente
    await usuario.save();

    return usuario;
  }

  async actualizarRutaGuardada(userId: string, rutaId: string, datos: Partial<GuardarRutaDto>) {
    const user = await this.usuarioModel.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const ruta = user.guardado.find(r => r.id === rutaId);
    if (!ruta) throw new NotFoundException('Ruta no encontrada');

    if (datos.status) ruta.status = datos.status;
    if (datos.actividades) ruta.actividades = datos.actividades;

    await user.save();
    return ruta;
  }


}
