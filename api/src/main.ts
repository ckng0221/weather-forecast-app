import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 8000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: [''] });

  await app.listen(PORT);
}
bootstrap();
