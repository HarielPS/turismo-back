import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Imagen {
  @Prop()
  url: string;
}

@Schema()
export class Comentario {
  @Prop({ type: Types.ObjectId, ref: 'Usuario' })
  usuario: Types.ObjectId;

  @Prop()
  comentario: string;

  @Prop()
  calificacion: number;

  @Prop({ type: [Imagen], default: [] })
  img: Imagen[];

  @Prop()
  fecha: Date;
}

@Schema()
export class Coordenadas {
  @Prop()
  lat: number;

  @Prop()
  long: number;
}

@Schema()
export class Fecha {
  @Prop()
  inicio: string;

  @Prop()
  fin: string;

  @Prop()
  descripcion: string;
}

@Schema()
export class Horario {
  @Prop()
  dia: string;

  @Prop()
  apertura: string;

  @Prop()
  cierre: string;
}

@Schema()
export class Servicio extends Document {
  @Prop()
  nombre: string;

  @Prop()
  img_profile: string;

  @Prop()
  calificacion: number;

  @Prop()
  descripcion: string;

  @Prop({ type: [Imagen], default: [] })
  imagenes: Imagen[];

  @Prop()
  duracion: number;

  @Prop()
  precio: number;

  @Prop()
  tel: string;

  @Prop()
  email: string;

  @Prop()
  web: string;

  @Prop({ type: [Horario], default: [] })
  horarios: Horario[] | Horario;

  @Prop()
  fecha: Fecha;

  @Prop({ type: [Comentario], default: [] })
  comentarios: Comentario[];

  @Prop({ type: Types.ObjectId})
  localidad: Types.ObjectId;

  @Prop({ type:Types.ObjectId, ref: 'Atributo' })
  categoria: Types.ObjectId;

  @Prop({ type: Types.ObjectId,  ref: 'Atributo' })
  tipo: Types.ObjectId;

  @Prop({ type: Types.ObjectId,  ref: 'Atributo' })
  subtipo: Types.ObjectId;

  @Prop()
  jerarquia: number;

  @Prop()
  tangible: boolean;

  @Prop({ type: Types.ObjectId })
  pueblo: Types.ObjectId;

  @Prop()
  coordenadas: Coordenadas;

  @Prop()
  ubicacion: string;
}

export const EventoSchema = SchemaFactory.createForClass(Servicio);
EventoSchema.set('collection', 'servicio');
