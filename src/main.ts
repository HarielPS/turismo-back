import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,    // elimina propiedades no definidas en el DTO
    transform: true,     // convierte strings a Date, booleanos, etc.
    transformOptions: {
      enableImplicitConversion: true, // convierte strings a Date, booleanos, etc.
    },
  }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
