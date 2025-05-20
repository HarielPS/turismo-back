// servicio.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { EventoSchema, Servicio } from './schema/servicio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Servicio.name, schema: EventoSchema }
    ])
  ],
  controllers: [ServicioController],
  providers: [ServicioService],
  exports: [ServicioService]
})
export class ServicioModule {}