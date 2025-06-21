import { IsArray, IsString, IsDateString } from 'class-validator';

export class CreatePlanDto {
  @IsArray()
  actividades: any[];

  @IsArray()
  hoteles: any[];

  @IsArray()
  restaurantes: any[];

  @IsArray()
  usuarios: any[];

  @IsArray()
  categorias: any[];

  @IsString()
  id_usuario: string;

  @IsDateString()
  fecha_inicio: string;

  @IsDateString()
  fecha_fin: string;
}
