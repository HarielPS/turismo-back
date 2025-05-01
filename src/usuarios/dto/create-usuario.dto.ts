// import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean, IsPhoneNumber, IsArray, IsInt } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre_viajero: string;

  @IsNotEmpty()
  @IsEmail()
  correo_viajero: string;

  @IsNotEmpty()
  @IsString()
  pass_viajero: string;

  @IsOptional()
  @IsString()
  sexo_viajero?: string;

  @IsOptional()
  @IsDate()
  fecha_nacimiento_viajero?: Date;

  @IsOptional()
  @IsPhoneNumber('MX') 
  telefono_viajero?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })  // Valida que cada elemento del array sea un número entero
  preferencias?: number[];

}
