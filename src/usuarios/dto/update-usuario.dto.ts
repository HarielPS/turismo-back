import {
  IsOptional,
  IsString,
  IsEmail,
  IsDateString,
  IsIn,
  IsUrl,
} from 'class-validator';

export class UpdateUserInfoDto {
  @IsOptional()
  @IsString()
  nombre_viajero?: string;

  @IsOptional()
  @IsString()
  primer_Apellido_viajero?: string;

  @IsOptional()
  @IsString()
  segundo_Apellido_viajero?: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento_viajero?: string; 

  @IsOptional()
  @IsString()
  sexo_viajero?: string;

  @IsOptional()
  @IsString()
  profesion_viajero?: string;

  @IsOptional()
  @IsEmail()
  correo_viajero?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsUrl()
  img?: string;
}
