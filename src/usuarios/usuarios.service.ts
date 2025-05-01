import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

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

  async updatePreferencias(id: string, preferencias: number[]) {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    usuario.preferencias = preferencias;
    return usuario.save();
  }
}
