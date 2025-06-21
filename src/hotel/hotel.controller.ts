import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './schema/hotel.schema';

@Controller('hoteles')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  async create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  async findAll(): Promise<Hotel[]> {
    return this.hotelService.findAll();
  }

  @Get('24horas')
  async find24Horas(): Promise<Hotel[]> {
    return this.hotelService.find24Horas();
  }

  @Get('precio')
  async findByPrecioMaximo(
    @Query('precioMax') precioMax: number,
  ): Promise<Hotel[]> {
    return this.hotelService.findByPrecioMaximo(precioMax);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Hotel | null> {
    return this.hotelService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHotelDto: Partial<CreateHotelDto>,
  ): Promise<Hotel | null> {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Hotel | null> {
    return this.hotelService.delete(id);
  }
}