import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async updatePreferencias(id: string, preferencias: UpdatePreferenciasDto['preferencias']) {
    const preferenciasConObjectId = preferencias.map((pref) => ({
      atributoID: new Types.ObjectId(pref.atributoID),
      conteo: pref.conteo,
    }));
  
    return this.usuarioModel.findByIdAndUpdate(
      id,
      { preferencias: preferenciasConObjectId },
      { new: true }
    );
  }

}
