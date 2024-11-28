import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Weather } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  create(createWeatherDto: CreateWeatherDto) {
    return 'This action adds a new weather';
  }

  findAll() {
    return this.weatherModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`;
  }

  update(id: number, updateWeatherDto: UpdateWeatherDto) {
    return `This action updates a #${id} weather`;
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}
