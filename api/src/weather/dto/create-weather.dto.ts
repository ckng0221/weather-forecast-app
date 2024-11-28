export class CreateWeatherDto {
  location: ILocation;
  date: string;
  morning_forecast: string;
  afternoon_forecast: string;
  evening_forecast: string;
  summary_forecast: string;
  summary_when: string;
  max_temp: number;
  min_temp: number;
}

export interface ILocation {
  location_id: string;
  location_name: string;
}
