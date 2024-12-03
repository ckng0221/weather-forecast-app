import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Weather } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  create(createWeatherDto: CreateWeatherDto) {
    const createWeather = new this.weatherModel(createWeatherDto);

    return createWeather.save();
  }

  findAll(): any {
    return this.weatherModel.find().exec();
  }

  findOne(id: string) {
    try {
      const _id = new mongoose.Types.ObjectId(id);
      return this.weatherModel.findById(_id).exec();
    } catch (error) {
      throw new HttpException('Invalid ID', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  update(id: string, updateWeatherDto: UpdateWeatherDto) {
    return this.weatherModel.findByIdAndUpdate(id, updateWeatherDto).exec();
  }

  remove(id: string) {
    return this.weatherModel.findByIdAndDelete(id).exec();
  }
}
