import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proveedor, ProveedorDocument } from './schemas/proveedor.schema';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectModel(Proveedor.name) private proveedorModel: Model<ProveedorDocument>,
  ) {}

  async findById(id: string) {
    const proveedor = await this.proveedorModel.findById(id).select('-pass_proveedor');
    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }
    return proveedor;
  }
}
