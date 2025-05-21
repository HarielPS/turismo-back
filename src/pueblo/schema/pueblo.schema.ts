import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PuebloDocument = Pueblo & Document;

@Schema({ timestamps: true }) // Opcional: añade createdAt y updatedAt
export class Pueblo {
  @Prop({
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  })
  nombre: string;

  @Prop({
    type: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true }
    },
    required: true
  })
  coordenadas: {
    lat: number;
    long: number;
  };
}

export const PuebloSchema = SchemaFactory.createForClass(Pueblo);

// Opcional: Crear índice geoespacial si necesitas búsquedas por ubicación
PuebloSchema.index({ 'coordenadas': '2dsphere' });