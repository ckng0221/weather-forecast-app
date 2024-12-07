import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { WeatherQuery } from './dto/read-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Weather } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  async create(createWeatherDto: CreateWeatherDto) {
    const searchQuery = {
      'location.location_id': createWeatherDto.location.location_id,
      date: {
        $eq: new Date(createWeatherDto.date),
      },
    };

    const result = await this.weatherModel.find(searchQuery).exec();
    if (result.length > 0) {
      throw new HttpException('Data already exists', HttpStatus.CONFLICT);
    }

    const createWeather = new this.weatherModel(createWeatherDto);

    return createWeather.save();
  }

  async createOrUpdate(createWeatherDto: CreateWeatherDto) {
    const searchQuery = {
      'location.location_id': createWeatherDto.location.location_id,
      date: {
        $eq: new Date(createWeatherDto.date),
      },
    };

    const results = await this.weatherModel.find(searchQuery).exec();
    // create new
    if (results.length == 0) {
      const createWeather = new this.weatherModel(createWeatherDto);

      return createWeather.save();
    } else {
      // update existing
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const _id = result._id;
        const dto: UpdateWeatherDto = createWeatherDto;
        dto.version = result.version + 1;
        return this.weatherModel.findByIdAndUpdate(_id, dto).exec();
      }
    }
  }

  findAll(query: WeatherQuery): any {
    const startDate = query.startDate;
    const endDate = query.endDate;

    // Process query parameters
    let searchQuery = {};
    if (startDate && endDate) {
      searchQuery = {
        ...searchQuery,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else if (startDate) {
      searchQuery = {
        ...searchQuery,
        date: {
          $gte: new Date(startDate),
        },
      };
    } else if (endDate) {
      searchQuery = {
        ...searchQuery,
        date: {
          $lte: new Date(endDate),
        },
      };
    } else {
      // Default today onwards only, if without query
      searchQuery = {
        ...searchQuery,
        date: {
          $gte: new Date().toISOString().slice(0, 10),
        },
      };
    }

    if (query.locationId) {
      searchQuery = {
        ...searchQuery,
        'location.location_id': {
          $regex: new RegExp(query.locationId, 'i'),
        },
      };
    } else if (query.locationName) {
      searchQuery = {
        ...searchQuery,
        'location.location_name': {
          $regex: new RegExp(query.locationName, 'i'),
        },
      };
    }

    if (query.identifier) {
      const locationId = query.identifier.slice(11);
      const date = query.identifier.slice(0, 10);

      searchQuery = {
        'location.location_id': locationId,
        date: {
          $eq: new Date(date),
        },
      };
    }

    return this.weatherModel.find(searchQuery).exec();
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
