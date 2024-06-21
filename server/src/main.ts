import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function nest() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ["https://moviego.uz", "https://www.moviego.uz", "http://localhost:3000"] });
  await app.setGlobalPrefix("api").listen(process.env.PORT);
}
nest();
