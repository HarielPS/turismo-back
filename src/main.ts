import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // GZIP para reducir carga en la memoria/transporte
  app.use(compression());

  // Validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // CORS para que funcione con el frontend (ajusta origin si es necesario)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  // Usa el puerto que Render inyecta por variable de entorno
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Aplicación corriendo en: http://localhost:${PORT}`);
}
bootstrap();
