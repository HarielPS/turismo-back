import { Module } from '@nestjs/common';
import { RestauranteController } from './restaurant.controller';
import { RestauranteService } from './restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurante, RestauranteSchema } from './schema/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurante.name, schema: RestauranteSchema }
    ])
  ],
  controllers: [RestauranteController],
  providers: [RestauranteService],
  exports: [RestauranteService],
})
export class RestaurantModule {}
