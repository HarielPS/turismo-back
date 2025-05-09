import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProveedorDocument = Proveedor & Document;

@Schema()
export class Proveedor {
  @Prop({ required: true })
  nombre_proveedor: string;

  @Prop({ required: true, unique: true })
  correo_proveedor: string;

  @Prop({ required: true })
  pass_proveedor: string;

  @Prop({ required: true })
  telefono_proveedor: string;

  @Prop({ required: true })
  direccion_proveedor: string;

  @Prop({ required: true })
  persona_contacto_proveedor: string;

  @Prop({ required: true, enum: ['Física', 'Moral'] })
  tipo_persona_proveedor: 'Física' | 'Moral';

  @Prop({ required: true })
  alta_proveedor: boolean;

  @Prop({ required: true })
  fecha_creacion: Date;

  @Prop()
  fecha_login: Date;

  // opcional en la creación del proveedor

  @Prop()
  img?: string; 

  @Prop()
  descripcion?: string;



}

export const ProveedorSchema = SchemaFactory.createForClass(Proveedor);
