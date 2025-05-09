import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { CreateProveedorDto } from '../proveedores/dto/create-proveedor.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from '../usuarios/schemas/usuario.schema';
import { Proveedor, ProveedorDocument } from '../proveedores/schemas/proveedor.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    @InjectModel(Proveedor.name) private proveedorModel: Model<ProveedorDocument>,
    private jwtService: JwtService,
  ) {}

  // Funcion para registrar un usuario
async registerUsuario(data: CreateUsuarioDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.pass_viajero, saltOrRounds);

    // Convertir fecha de nacimiento de string a Date, si es string
    const fechaNacimientoDate =
    typeof data.fecha_nacimiento_viajero === 'string'
      ? new Date(data.fecha_nacimiento_viajero)
      : data.fecha_nacimiento_viajero;
  
    const nuevoUsuario = new this.usuarioModel({
      ...data,
      pass_viajero: hashedPassword,
      fecha_nacimiento_viajero: fechaNacimientoDate,
      alta_usuario: true,
      fecha_creacion: new Date(),
      fecha_login: new Date(),
    });
  
    return nuevoUsuario.save();
}

// Funcion para registrar preferencias de un usuario
async registerPreferencias(id: string, preferencias: number[]) {

}


// Funcion para registrar un proveedor
async registerProveedor(data: CreateProveedorDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.pass_proveedor, saltOrRounds);
  
    const nuevoProveedor = new this.proveedorModel({
      ...data,
      pass_proveedor: hashedPassword,
      fecha_creacion: new Date(),
      fecha_login: new Date (),
    });
  
    return nuevoProveedor.save();
  }

  async login(loginData: { correo: string; pass: string }) 
  {
    const { correo, pass } = loginData;
  
    try {
      // Buscar en usuarios
      let user = await this.usuarioModel.findOne({ correo_viajero: correo });
  
      if (user) {
        const isMatch = await bcrypt.compare(pass, user.pass_viajero);
        if (!isMatch) {
          throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        }
  
        user.fecha_login = new Date();
        await user.save();
  
        const payload = { sub: user._id, role: 'usuario' };
        const token = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          algorithm: 'HS256',
        });
  
        return { token, role: 'usuario' };
      }
  
      // Buscar en proveedores
      const provider = await this.proveedorModel.findOne({ correo_proveedor: correo });
  
      if (provider) {
        const isMatch = await bcrypt.compare(pass, provider.pass_proveedor);
        if (!isMatch) {
          throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        }
  
        provider.fecha_login = new Date();
        await provider.save();
  
        const payload = { sub: provider._id, role: 'proveedor' };
        const token = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          algorithm: 'HS256',
        });
  
        return { token, role: 'proveedor' };
      }
  
      // Si no se encuentra el usuario ni el proveedor
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  
    } catch (error) {
      console.error('Error en login:', error);
      throw new HttpException(
        error.message || 'Error interno del servidor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
}
