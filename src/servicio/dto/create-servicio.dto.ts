import {
  IsString, IsNumber, IsOptional, IsArray, IsBoolean, IsMongoId, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ImagenDto {
  @IsString()
  url: string;
}

class ComentarioDto {
  @IsMongoId()
  usuario: string;

  @IsString()
  comentario: string;

  @IsNumber()
  calificacion: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagenDto)
  img?: ImagenDto[];

  @IsString()
  fecha: string;
}

class FechaDto {
  @IsString()
  inicio: string;

  @IsString()
  fin: string;

  @IsString()
  descripcion: string;
}

class HorarioDto {
  @IsString()
  dia: string;

  @IsString()
  apertura: string;

  @IsString()
  cierre: string;
}

class CoordenadasDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  long: number;
}

export class CreateEventoDto {
  @IsString()
  nombre: string;

  @IsString()
  img_profile: string;

  @IsNumber()
  calificacion: number;

  @IsString()
  descripcion: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagenDto)
  imagenes: ImagenDto[];

  @IsNumber()
  duracion: number;

  @IsNumber()
  precio: number;

  @IsString()
  tel: string;

  @IsString()
  email: string;

  @IsString()
  web: string;

  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[] | HorarioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FechaDto)
  fecha?: FechaDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComentarioDto)
  comentarios: ComentarioDto[];

  @IsMongoId()
  localidad: string;

  @IsMongoId()
  categoria: string;

  @IsMongoId()
  tipo: string;

  @IsOptional()
  @IsMongoId()
  subtipo?: string;

  @IsNumber()
  jerarquia: number;

  @IsBoolean()
  tangible: boolean;

  @IsMongoId()
  pueblo: string;

  @ValidateNested()
  @Type(() => CoordenadasDto)
  coordenadas: CoordenadasDto;

  @IsString()
  ubicacion: string;
}
