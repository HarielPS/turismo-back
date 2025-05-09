import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId, ValidateIf } from 'class-validator';

export class CreateAtributoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsNumber()
  nivel: number;

  @ValidateIf((o) => o.padre !== null)
  @IsMongoId({ message: 'El ID del padre debe ser un MongoId válido' })
  @IsOptional()
  padre?: string | null;

  @IsOptional()
  @IsString()
  img?: string;
}
