import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { ReadWeatherDto } from './dto/read-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weathers')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  // TODO: query param for filtering dates
  @Get()
  findAll(): Promise<ReadWeatherDto[]> {
    return this.weatherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weatherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
    return this.weatherService.update(id, updateWeatherDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.weatherService.remove(id);
  }
}
