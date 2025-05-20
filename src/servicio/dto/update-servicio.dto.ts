import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDto } from './create-servicio.dto';

export class UpdateEventoDto extends PartialType(CreateEventoDto) {}
