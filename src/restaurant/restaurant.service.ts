import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurante } from './schema/restaurant.schema';
import { Model } from 'mongoose';
import { CreateRestauranteDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectModel('Restaurante') private restauranteModel: Model<Restaurante>,
  ) {}

  async create(createRestauranteDto: CreateRestauranteDto): Promise<Restaurante> {
    const createdRestaurante = new this.restauranteModel(createRestauranteDto);
    return createdRestaurante.save();
  }

  async findAll(): Promise<Restaurante[]> {
    return this.restauranteModel.find().exec();
  }

  async findById(id: string): Promise<Restaurante | null> {
    return this.restauranteModel.findById(id).exec();
  }

  async update(
    id: string,
    updateRestauranteDto: Partial<CreateRestauranteDto>,
  ): Promise<Restaurante | null> {
    return this.restauranteModel
      .findByIdAndUpdate(id, updateRestauranteDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Restaurante | null> {
    return this.restauranteModel.findByIdAndDelete(id).exec();
  }

  // Método adicional para búsqueda por ubicación
  async findByUbicacion(ubicacion: string): Promise<Restaurante[]> {
    return this.restauranteModel.find({ ubicacion: new RegExp(ubicacion, 'i') }).exec();
  }
}