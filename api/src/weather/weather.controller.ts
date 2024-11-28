import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weathers')
export class WeatherController {
  constructor(private readonly WeatherService: WeatherService) {}

  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.WeatherService.create(createWeatherDto);
  }

  @Get()
  findAll() {
    return this.WeatherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.WeatherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
    return this.WeatherService.update(+id, updateWeatherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.WeatherService.remove(+id);
  }
}
