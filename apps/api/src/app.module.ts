import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather_v1/weather.module';
import { AuthModule } from './auth/auth.module';

const MONGODB_URI = process.env.MONGODB_URI;

@Module({
  imports: [
    WeatherModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGODB_URI),
    CacheModule.register({ isGlobal: true, ttl: 60000 }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
