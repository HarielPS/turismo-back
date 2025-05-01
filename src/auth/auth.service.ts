import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { CreateProveedorDto } from '../proveedores/dto/create-proveedor.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from '../usuarios/schemas/usuario.schema';
import { Proveedor, ProveedorDocument } from '../proveedores/schemas/proveedor.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    @InjectModel(Proveedor.name) private proveedorModel: Model<ProveedorDocument>,
    private jwtService: JwtService,
  ) {}

//   async registerUsuario(usuarioData: any) {
//     const usuario = new this.usuarioModel(usuarioData);
//     return usuario.save();
//   }

async registerUsuario(data: CreateUsuarioDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.pass_viajero, saltOrRounds);
  
    const nuevoUsuario = new this.usuarioModel({
      ...data,
      pass_viajero: hashedPassword,
    });
  
    return nuevoUsuario.save();
  }

  async registerProveedor(data: CreateProveedorDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.pass_proveedor, saltOrRounds);
  
    const nuevoProveedor = new this.proveedorModel({
      ...data,
      pass_proveedor: hashedPassword, // <-- Guardamos hasheado
    });
  
    return nuevoProveedor.save();
  }

  async login(loginData: { correo: string; pass: string }) {
    const { correo, pass } = loginData;

    // 1. Buscar en usuarios
    let user = await this.usuarioModel.findOne({ correo_viajero: correo });

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.pass_viajero);
      if (!isMatch) {
        throw new Error('Contraseña incorrecta');
      }
      const payload = { sub: user._id, role: 'usuario' };
    //   const token = this.jwtService.sign(payload);
    const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        algorithm: 'HS256',
      });
      return { token, role: 'usuario' };
    }

    // 2. Si no está en usuarios, buscar en proveedores
    const provider = await this.proveedorModel.findOne({ correo_proveedor: correo });

    if (provider) {
      const isMatch = await bcrypt.compare(pass, provider.pass_proveedor);
      if (!isMatch) {
        throw new Error('Contraseña incorrecta');
      }
      const payload = { sub: provider._id, role: 'proveedor' };
    //   const token = this.jwtService.sign(payload);
    const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET, 
        algorithm: 'HS256', 
      });
      return { token, role: 'proveedor' };
    }

    throw new Error('Usuario no encontrado');
  }
}
