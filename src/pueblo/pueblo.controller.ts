import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuebloService } from './pueblo.service';
import { CreatePuebloDto } from './dto/create-pueblo.dto';
import { UpdatePuebloDto } from './dto/update-pueblo.dto';

@Controller('pueblo')
export class PuebloController {
  constructor(private readonly puebloService: PuebloService) {}

  @Post()
  create(@Body() createPuebloDto: CreatePuebloDto) {
    return this.puebloService.create(createPuebloDto);
  }

  @Get()
  findAll() {
    return this.puebloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puebloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuebloDto: UpdatePuebloDto) {
    return this.puebloService.update(+id, updatePuebloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puebloService.remove(+id);
  }
}
