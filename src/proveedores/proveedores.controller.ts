import { Controller, Get, Param } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findById(id);
  }
}
