import { IsArray, ValidateNested, IsMongoId, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class PreferenciaDto {
  @IsMongoId()
  atributoID: string;

  @IsInt()
  @Min(1)
  conteo: number;
}

export class UpdatePreferenciasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreferenciaDto)
  preferencias: PreferenciaDto[];
}
