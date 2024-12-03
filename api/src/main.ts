import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const PORT = 8000;
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api', { exclude: [''] });

  const config = new DocumentBuilder()
    .setTitle('Weather Forecast API')
    .setDescription('API endpoints')
    .setVersion('1.0')
    .addTag('Weather')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  // Cors
  const allowedOrigin = configService.get('FRONTEND_HOST');
  app.enableCors({ origin: allowedOrigin });

  await app.listen(PORT);
}
bootstrap();
