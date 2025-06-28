import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ActividadGuardadaDto {
  @IsString()
  id: string;

  @IsEnum(['servicio', 'hotel', 'alimento'])
  tipo: 'servicio' | 'hotel' | 'alimento';

  @IsEnum(['reserva', 'eliminar'])
  estado: 'reserva' | 'eliminar';
}

export class GuardarRutaDto {
  @IsString()
  id: string;

  @IsEnum(['reserva', 'eliminar'])
  status: 'reserva' | 'eliminar';

  @IsString()
  fecha_guardado: string;

  @IsArray()
  actividades: ActividadGuardadaDto[];
}
