import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from './schema/hotel.schema';
import { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel('Hotel') private hotelModel: Model<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createHotelDto);
    return createdHotel.save();
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async findById(id: string): Promise<Hotel | null> {
    return this.hotelModel.findById(id).exec();
  }

  async update(
    id: string,
    updateHotelDto: Partial<CreateHotelDto>,
  ): Promise<Hotel | null> {
    return this.hotelModel
      .findByIdAndUpdate(id, updateHotelDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Hotel | null> {
    return this.hotelModel.findByIdAndDelete(id).exec();
  }

  // Método para filtrar por precio máximo
  async findByPrecioMaximo(precioMax: number): Promise<Hotel[]> {
    return this.hotelModel.find({ precio: { $lte: precioMax } }).exec();
  }

  // Método para hoteles con horario 24 horas
  async find24Horas(): Promise<Hotel[]> {
    return this.hotelModel.find({ 'horarios.apertura': '24 horas' }).exec();
  }
}