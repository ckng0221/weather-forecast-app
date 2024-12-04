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
  Put,
  Query,
} from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { ReadWeatherDto, WeatherQuery } from './dto/read-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { WeatherService } from './weather.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('weathers')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Put()
  createOrUpdate(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.createOrUpdate(createWeatherDto);
  }

  @Get()
  @ApiQuery({
    name: 'identifier',
    example: '2024-01-01_Ds001',
    required: false,
    description: 'Only search based on unique identifier',
  })
  @ApiQuery({ name: 'locationName', example: 'Langkawi', required: false })
  @ApiQuery({ name: 'endDate', example: '2024-12-31', required: false })
  @ApiQuery({ name: 'startDate', example: '2024-01-01', required: false })
  findAll(@Query() query: WeatherQuery): Promise<ReadWeatherDto[]> {
    return this.weatherService.findAll(query);
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
