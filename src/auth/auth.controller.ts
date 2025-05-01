import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { CreateProveedorDto } from '../proveedores/dto/create-proveedor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-usuario')
  async registerUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.registerUsuario(createUsuarioDto);
  }

  @Post('register-proveedor')
  async registerProveedor(@Body() createProveedorDto: CreateProveedorDto) {
    return this.authService.registerProveedor(createProveedorDto);
  }

  @Post('login')
  async login(@Body() loginData: { correo: string; pass: string }) {
    return this.authService.login(loginData);
  }
}
