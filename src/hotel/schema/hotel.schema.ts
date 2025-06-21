import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Horario {
  @Prop({ required: true })
  dia: string;

  @Prop({ required: true })
  apertura: string;

  @Prop()
  cierre: string;
}

@Schema()
class Coordenadas {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  long: number;
}

@Schema({ timestamps: true })
export class Hotel extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  img_profile: string;

  @Prop({ required: true })
  calificacion: number;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: [{ url: String }], default: [] })
  imagenes: { url: string }[];

  @Prop()
  duracion: number;

  @Prop({ required: true })
  precio: number;

  @Prop()
  tel: string;

  @Prop()
  email: string;

  @Prop()
  web: string;

  @Prop({ type: [Horario], required: true })
  horarios: Horario[];

  @Prop({ type: Coordenadas, required: true })
  coordenadas: Coordenadas;

  @Prop({ required: true })
  ubicacion: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
HotelSchema.set('collection', 'hotel');