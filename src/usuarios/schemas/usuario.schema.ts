import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class PreferenciaItem {
  @Prop({ type: Types.ObjectId, ref: 'atributos', required: true })
  atributoID: Types.ObjectId;

  @Prop({ required: true, default: 1 })
  conteo: number;
}
export const PreferenciaItemSchema = SchemaFactory.createForClass(PreferenciaItem);

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre_viajero: string;

  @Prop({ required: true })
  primer_Apellido_viajero: string;
  
  @Prop({ required: true })
  segundo_Apellido_viajero: string;
  
  @Prop({ required: true, unique: true })
  correo_viajero: string;

  @Prop({ required: true })
  pass_viajero: string;

  @Prop({ required: true })
  sexo_viajero: string;

  @Prop({ required: true })
  fecha_nacimiento_viajero: Date;

  @Prop({ required: true })
  telefono_viajero: string;

  @Prop({ type: [PreferenciaItemSchema], default: [] })
  preferencias: PreferenciaItem[];

  @Prop({ required: true })
  alta_usuario: boolean;

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

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
