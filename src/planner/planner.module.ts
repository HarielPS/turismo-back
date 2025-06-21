// planner.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlannerService } from './planner.service';
import { PlannerController } from './planner.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { HotelModule } from '../hotel/hotel.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { ServicioModule } from '../servicio/servicio.module';
import { AtributosModule } from '../atributos/atributos.module';

@Module({
  imports: [
    HttpModule,
    UsuariosModule,    // Provee UsuariosService
    HotelModule,       // Provee HotelService
    RestaurantModule,  // Provee RestauranteService (¡nombre exacto!)
    ServicioModule,    // Provee ServicioService
    AtributosModule,   // Provee AtributosService
  ],
  controllers: [PlannerController],
  providers: [PlannerService],
})
export class PlannerModule {}