import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Atributo, AtributoDocument } from './schemas/atributo.schema';

@Injectable()
export class AtributosService {
  constructor(
    @InjectModel(Atributo.name)
    private readonly atributoModel: Model<AtributoDocument>,
  ) {}

  // Crear nuevo atributo
  async crear(data: Partial<Atributo>): Promise<Atributo> {
    const nuevo = new this.atributoModel(data);
    return nuevo.save();
  }

  // Obtener todos los atributos
  async obtenerTodos(): Promise<Atributo[]> {
    return this.atributoModel.find().exec();
  }

  // Obtener uno por ID
  async obtenerPorId(id: string): Promise<Atributo | null> {
    return this.atributoModel.findById(id).exec();
  }

  // Actualizar un atributo
  async actualizar(id: string, data: Partial<Atributo>): Promise<Atributo | null> {
    return this.atributoModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Eliminar un atributo
  async eliminar(id: string): Promise<Atributo | null> {
    return this.atributoModel.findByIdAndDelete(id).exec();
  }

  // Obtener atributos por nivel
  async obtenerPorNivel(nivel: number): Promise<Atributo[]> {
    return this.atributoModel.find({ nivel }).exec();
  }

  // Obtener subatributos (por padre)
  async obtenerPorPadre(idPadre: string): Promise<Atributo[]> {
    return this.atributoModel.find({ padre: new Types.ObjectId(idPadre) }).exec();
  }
}
