import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsIn, IsPhoneNumber } from 'class-validator';

export class CreateProveedorDto {
  @IsNotEmpty()
  @IsString()
  nombre_proveedor: string;

  @IsNotEmpty()
  @IsEmail()
  correo_proveedor: string;

  @IsNotEmpty()
  @IsString()
  pass_proveedor: string;

  @IsNotEmpty()
  @IsPhoneNumber('MX')
  telefono_proveedor: string; 

  @IsNotEmpty()
  @IsString()
  direccion_proveedor: string;

  @IsNotEmpty()
  @IsString()
  persona_contacto_proveedor: string;

  @IsNotEmpty()
  @IsIn(['Física', 'Moral'])
  tipo_persona_proveedor: string; 

}