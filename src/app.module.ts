import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { AuthModule } from './auth/auth.module';
import { AtributosModule } from './atributos/atributos.module';
import { ServicioModule } from './servicio/servicio.module';
import { PuebloModule } from './pueblo/pueblo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('📦 MONGODB_URI cargada:', uri);
        return {
          uri: uri || 'mongodb://localhost:27017/turismo',
        };
      },
    }),
    AuthModule,
    UsuariosModule,
    ProveedoresModule,
    AtributosModule,
    ServicioModule,
    PuebloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
