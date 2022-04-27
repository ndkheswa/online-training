import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser"
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
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
  await app.listen(3000); 
}

bootstrap();
