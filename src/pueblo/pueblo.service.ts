import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePuebloDto } from './dto/create-pueblo.dto';
import { UpdatePuebloDto } from './dto/update-pueblo.dto';
import { Pueblo } from './entities/pueblo.entity';

@Injectable()
export class PuebloService {
  constructor(
    @InjectModel(Pueblo.name)
    private readonly atributoModel: Model<Pueblo>,
  ) {}
  // Crear nuevo
  async crear(data: Partial<Pueblo>): Promise<Pueblo> {
    const nuevo = new this.atributoModel(data);
    return nuevo.save();
  }

  // Obtener todos los atributos
  async obtenerTodos(): Promise<Pueblo[]> {
    return this.atributoModel.find().exec();
  }

  // Obtener uno por ID
  async obtenerPorId(id: string): Promise<Pueblo | null> {
    return this.atributoModel.findById(id).exec();
  }

  // actualizar
  async actualizar(id: string, data: Partial<Pueblo>): Promise<Pueblo | null> {
    return this.atributoModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // eliminar
  async eliminar(id: string): Promise<Pueblo | null> {
    return this.atributoModel.findByIdAndDelete(id).exec();
  }
  

}
