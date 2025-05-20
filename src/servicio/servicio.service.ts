import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Servicio } from './schema/servicio.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicioService {
  constructor(
    @InjectModel('Servicio') private servicioModel: Model<Servicio>,
  ) {}
async findAll(): Promise<Servicio[]> {
    return this.servicioModel.find()
      .populate('localidad')
      .populate('categoria')
      .populate('tipo')
      .populate('subtipo')
      .populate('pueblo')
      .populate('comentarios.usuario')
      .exec();
  }
}
