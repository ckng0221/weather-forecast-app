import { CacheInterceptor } from '@nestjs/cache-manager';
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
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { ReadWeatherDto, WeatherQuery } from './dto/read-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller({ version: '1' })
@UseInterceptors(CacheInterceptor)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('weathers')
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Put('weathers')
  createOrUpdate(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.createOrUpdate(createWeatherDto);
  }

  @Get('weathers')
  @ApiQuery({
    name: 'identifier',
    example: '2024-01-01_Ds001',
    required: false,
  })
  @ApiQuery({ name: 'locationName', example: 'Langkawi', required: false })
  @ApiQuery({ name: 'locationId', example: 'Ds001', required: false })
  @ApiQuery({ name: 'endDate', example: '2024-12-31', required: false })
  @ApiQuery({ name: 'startDate', example: '2024-01-01', required: false })
  @ApiQuery({ name: 'date', example: '2024-01-01', required: false })
  findAll(@Query() query: WeatherQuery): Promise<ReadWeatherDto[]> {
    return this.weatherService.findAll(query);
  }

  @Get('weathers/:id')
  findOne(@Param('id') id: string) {
    return this.weatherService.findOne(id);
  }

  @Patch('weathers/:id')
  update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
    return this.weatherService.update(id, updateWeatherDto);
  }

  @Delete('weathers/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.weatherService.remove(id);
  }
}
