import { PartialType } from '@nestjs/mapped-types';
import { CreatePuebloDto } from './create-pueblo.dto';

export class UpdatePuebloDto extends PartialType(CreatePuebloDto) {}
