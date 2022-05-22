import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3001,'0.0.0.0');
  Logger.log(`Server started running on http://localhost:${process.env.PORT}`, 'Bootstrap');
}
bootstrap();
