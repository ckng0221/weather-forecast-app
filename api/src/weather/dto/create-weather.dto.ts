import { ApiProperty } from '@nestjs/swagger';

export class CreateWeatherDto {
  @ApiProperty({
    type: 'object',
    properties: {
      location_id: {
        type: 'string',
        example: 'Ds001',
      },
      location_name: {
        type: 'string',
        example: 'Langkawi',
      },
    },
  })
  location: ILocation;

  @ApiProperty({ example: new Date('2024-01-01') })
  date: Date;

  @ApiProperty({ example: 'Hujan di beberapa tempat' })
  morning_forecast: string;

  @ApiProperty({ example: 'Ribut petir di beberapa tempat' })
  afternoon_forecast: string;

  @ApiProperty({ example: 'Tiada Hujan' })
  night_forecast: string;

  @ApiProperty({ example: 'Hujan di beberapa tempat' })
  summary_forecast: string;

  @ApiProperty({ example: 'Petang' })
  summary_when: string;

  @ApiProperty({ example: 32 })
  max_temp: number;

  @ApiProperty({ example: 25 })
  min_temp: number;
}

export interface ILocation {
  location_id: string;
  location_name: string;
}
