import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AtributoDocument = Atributo & Document;

@Schema()
export class Atributo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  nivel: number;

  @Prop({ type: Types.ObjectId, ref: 'Atributo', default: null })
  padre: Types.ObjectId | null;

  @Prop()
  img?: string;
}

export const AtributoSchema = SchemaFactory.createForClass(Atributo);
