import { PartialType } from '@nestjs/mapped-types';
import { ReadWeatherDto } from './read-weather.dto';

export class UpdateWeatherDto extends PartialType(ReadWeatherDto) {}
