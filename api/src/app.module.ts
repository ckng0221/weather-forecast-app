import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';

const MONGODB_URI = 'mongodb://localhost:27017/weather-forecast';

@Module({
  imports: [WeatherModule, MongooseModule.forRoot(MONGODB_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
