import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ImagenDto {
  @IsString()
  @IsOptional()
  url: string;
}

class HorarioDto {
  @IsString()
  dia: string;

  @IsString()
  apertura: string;

  @IsString()
  @IsOptional()
  cierre: string;
}

class CoordenadasDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  long: number;
}

export class CreateHotelDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  img_profile: string;

  @IsNumber()
  calificacion: number;

  @IsString()
  descripcion: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagenDto)
  @IsOptional()
  imagenes: ImagenDto[];

  @IsNumber()
  @IsOptional()
  duracion: number | null;

  @IsNumber()
  precio: number;

  @IsString()
  @IsOptional()
  tel: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  web: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  horarios: HorarioDto[];

  @ValidateNested()
  @Type(() => CoordenadasDto)
  coordenadas: CoordenadasDto;

  @IsString()
  ubicacion: string;
}