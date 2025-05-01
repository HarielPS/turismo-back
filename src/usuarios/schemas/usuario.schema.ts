import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre_viajero: string;

  @Prop({ required: true, unique: true })
  correo_viajero: string;

  @Prop({ required: true })
  pass_viajero: string;

  @Prop({ required: true })
  sexo_viajero: string;

  @Prop({ required: true })
  fecha_nacimiento_viajero: string;

  @Prop({ required: true })
  telefono_viajero: string;

  @Prop({ type: [Number], default: [] })
  preferencias: number[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
