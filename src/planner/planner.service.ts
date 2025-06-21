import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { firstValueFrom } from 'rxjs';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { HotelService } from '../hotel/hotel.service';
import { RestauranteService } from '../restaurant/restaurant.service';
import { ServicioService } from '../servicio/servicio.service';
import { AtributosService } from '../atributos/atributos.service';

@Injectable()
export class PlannerService {
//   constructor(private readonly http: HttpService) {}
    constructor(
        private readonly http: HttpService,
        private readonly usuarioService: UsuariosService,
        private readonly hotelService: HotelService,
        private readonly restauranteService: RestauranteService,
        private readonly actividadService: ServicioService,
        private readonly categoriaService: AtributosService,
    ) {}

//     async generatePlanAutomatic(id_usuario: string, fecha_inicio: string, fecha_fin: string) {
//   console.log('[NestJS] Iniciando generatePlanAutomatic...'); // Debug 1
  
//   const [usuario, hoteles, restaurantes, actividades, categorias] = await Promise.all([
//     this.usuarioService.findById(id_usuario),
//     this.hotelService.findAll(),
//     this.restauranteService.findAll(),
//     this.actividadService.findAll(),
//     this.categoriaService.obtenerTodos(),
//   ]);

//   console.log('[NestJS] Datos obtenidos:', { usuario, hoteles }); // Debug 2

//   // const payload = {
//   //   actividades,
//   //   hoteles,
//   //   restaurantes,
//   //   usuarios: [usuario],
//   //   categorias,
//   //   id_usuario,
//   //   fecha_inicio,
//   //   fecha_fin,
//   // };
//   // En tu PlannerService (NestJS)
//   const payload = {
//     actividades: actividades.map(a => a.toObject()),  // Convierte documentos MongoDB a objetos
//     hoteles: hoteles.map(h => h.toObject()),
//     restaurantes: restaurantes.map(r => r.toObject()),
//     usuarios: [usuario.toObject()],
//     categorias: categorias,
//     id_usuario,
//     fecha_inicio,
//     fecha_fin,
//   };

//   console.log('[NestJS] Payload para Flask:', payload); // Debug 3

//   try {
//     const response = await firstValueFrom(
//       this.http.post('http://localhost:5000/api/plan-itinerario', payload)
//     );
//     console.log('[NestJS] Respuesta de Flask:', response.data); // Debug 4
//     return response.data;
//   } catch (error) {
//     console.error('[NestJS] Error al llamar a Flask:', error.message); // Debug 5
//     throw new Error('Fallo al comunicarse con la API de planificación');
//   }
// }

async generatePlanAutomatic(id_usuario: string, fecha_inicio: string, fecha_fin: string) {
  console.log('[NestJS][1/5] Iniciando generación de plan...');
  
  try {
    // 1. Obtener todos los datos necesarios
    console.log('[NestJS][2/5] Obteniendo datos de bases de datos...');
    const [usuario, hoteles, restaurantes, actividades, categorias] = await Promise.all([
      this.usuarioService.findById(id_usuario),
      this.hotelService.findAll(),
      this.restauranteService.findAll(),
      this.actividadService.findAll(),
      this.categoriaService.obtenerTodos(),
    ]);

    // 2. Validación básica de datos
    console.log('[NestJS][3/5] Validando datos obtenidos...');
    if (!usuario) throw new Error('Usuario no encontrado');
    if (!hoteles?.length) console.warn('Advertencia: No se encontraron hoteles');
    if (!restaurantes?.length) console.warn('Advertencia: No se encontraron restaurantes');
    if (!actividades?.length) throw new Error('No hay actividades disponibles');

    // 3. Preparar payload para Flask
    console.log('[NestJS][4/5] Preparando payload para Flask...');
    const payload = {
      actividades: actividades.map(a => {
        const actividad = a.toObject();
        // Asegurar que las coordenadas tengan el formato correcto
        if (actividad.ubicacion?.coordinates) {
          actividad.coordenadas = {
            lat: actividad.ubicacion.coordinates[1],
            long: actividad.ubicacion.coordinates[0]
          };
        }
        return actividad;
      }),
      hoteles: hoteles.map(h => {
        const hotel = h.toObject();
        // Transformación similar para hoteles si es necesario
        return hotel;
      }),
      restaurantes: restaurantes.map(r => {
        const restaurante = r.toObject();
        // Transformación similar para restaurantes
        return restaurante;
      }),
      usuarios: [usuario.toObject()],
      categorias: categorias,
      id_usuario,
      fecha_inicio,
      fecha_fin,
    };

    console.log('[NestJS] Payload completo:', JSON.stringify(payload, null, 2));

    // 4. Llamada a Flask
    console.log('[NestJS][5/5] Enviando a Flask...');
    const response = await firstValueFrom(
      // this.http.post('http://localhost:5000/api/plan-itinerario', payload)
      this.http.post(`${process.env.API_URL}/api/plan-itinerario`, payload)
    );

    console.log('[NestJS] Respuesta de Flask recibida correctamente');
    return response.data;

  } catch (error) {
    console.error('[NestJS] Error en generatePlanAutomatic:', error.message);
    console.error(error.stack);
    throw new Error(`Error al generar plan: ${error.message}`);
  }
}

}
