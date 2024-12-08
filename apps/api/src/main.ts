import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { WeatherModule as WeatherModule_V1 } from './weather_v1/weather.module';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.use(helmet());

  // logging
  const loggingMode =
    process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
  app.use(morgan(loggingMode));

  // Cors
  const allowedOrigin = configService.get('FRONTEND_HOST');
  app.enableCors({ origin: allowedOrigin });

  app.use(compression());

  app.disable('x-powered-by');

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // Swagger OpenAPI
  if (process.env.NODE_ENV === 'development') {
    const configV1 = new DocumentBuilder()
      .setTitle('Weather Forecast API')
      .setDescription('API endpoints')
      .setVersion('1.0')
      .build();

    const documentFactoryV1 = () =>
      SwaggerModule.createDocument(app, configV1, {
        include: [WeatherModule_V1],
      });
    SwaggerModule.setup('v1/docs', app, documentFactoryV1);

    // For fture V2 APIs
    // const configV2 = new DocumentBuilder()
    //   .setTitle('Weather Forecast API')
    //   .setDescription('API endpoints')
    //   .setVersion('2.0')
    //   .build();

    // const documentFactoryV2 = () => SwaggerModule.createDocument(app, configV2);
    // SwaggerModule.setup('v2/docs', app, documentFactoryV2);
  }

  // app.setGlobalPrefix('api', { exclude: [''] });

  await app.listen(PORT);
}
bootstrap();
