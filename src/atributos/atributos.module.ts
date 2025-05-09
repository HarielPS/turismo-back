// atributos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Atributo, AtributoSchema } from './schemas/atributo.schema';
import { AtributosService } from './atributos.service';
import { AtributosController } from './atributos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Atributo.name, schema: AtributoSchema }])
  ],
  controllers: [AtributosController],
  providers: [AtributosService],
})
export class AtributosModule {}
