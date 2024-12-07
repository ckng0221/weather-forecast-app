import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { CacheModule } from '@nestjs/cache-manager';

const MONGODB_URI = process.env.MONGODB_URI;

@Module({
  imports: [
    WeatherModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGODB_URI),
    CacheModule.register({ isGlobal: true, ttl: 60000 }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
