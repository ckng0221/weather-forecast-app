import { ApiProperty } from '@nestjs/swagger';
import { CreateWeatherDto } from './create-weather.dto';

export class ReadWeatherDto extends CreateWeatherDto {
  @ApiProperty({ example: '6748687a61913974d8c291d1' })
  _id: string;

  @ApiProperty({ example: new Date() })
  last_modified: Date;

  @ApiProperty({ example: 1 })
  version: number;
}

export interface WeatherQuery {
  startDate: Date;
  endDate: Date;
  locationName: string;
  identifier: string;
}
