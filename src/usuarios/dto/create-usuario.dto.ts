// import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { 
  IsDate, 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsBoolean, 
  IsPhoneNumber, 
  IsArray, 
  IsInt,
  Min,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';


class PreferenciaDto {
  @IsMongoId()
  atributoID: string;

  @IsInt()
  @Min(1)
  conteo: number;
}

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre_viajero: string;

  @IsNotEmpty()
  @IsString()
  primer_Apellido_viajero: string;

  @IsNotEmpty()
  @IsString()
  segundo_Apellido_viajero: string;

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

  // @IsOptional()
  // @IsArray()
  // @IsInt({ each: true }) 
  // preferencias?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreferenciaDto)
  preferencias?: PreferenciaDto[];

  @IsOptional()
  @IsBoolean()
    alta_usuario: boolean;

  @IsOptional()
  @IsDate()
  fecha_creacion: Date;

  @IsOptional()
  @IsDate()
  fecha_login?: Date;

  @IsOptional()
  @IsString()
  img?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;


}
