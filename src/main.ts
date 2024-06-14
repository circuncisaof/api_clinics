import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const options = {
  origin: 'http://localhost:4200/',
  allowedHeaders: 'Content-Type, Accept',
  credentials: true,
  methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
  header: 'Access-Control-Allow-Origin: *',
};

export const globalset = 'api/v1/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors(options);
  app.setGlobalPrefix(globalset);
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
