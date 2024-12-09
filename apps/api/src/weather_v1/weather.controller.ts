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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { HeaderApiKeyAuthGuard } from '../auth/httpapikey-auth.guard';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { ReadWeatherDto, WeatherQuery } from './dto/read-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller({ path: 'weathers', version: '1' })
@UseInterceptors(CacheInterceptor)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiSecurity('Api-Key')
  @Post()
  @UseGuards(HeaderApiKeyAuthGuard)
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @ApiSecurity('Api-Key')
  @Put()
  @UseGuards(HeaderApiKeyAuthGuard)
  createOrUpdate(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.createOrUpdate(createWeatherDto);
  }

  @Get()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weatherService.findOne(id);
  }

  @ApiSecurity('Api-Key')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
    return this.weatherService.update(id, updateWeatherDto);
  }

  @ApiSecurity('Api-Key')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.weatherService.remove(id);
  }
}
