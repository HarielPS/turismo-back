import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CoordenadasDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  long: number;
}

export class CreatePuebloDto {

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ValidateNested()
  @Type(() => CoordenadasDto)
  coordenadas: CoordenadasDto;


}
