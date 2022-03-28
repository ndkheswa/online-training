import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose']
  });
  app.enableCors({  
    origin: '*',
    allowedHeaders: '*',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });
  await app.listen(3000); 
}

bootstrap();
