interface ILocation {
  location_id: string;
  location_name: string;
}

export interface IWeather {
  location: ILocation;
  date: string;
  morning_forecast: string;
  afternoon_forecast: string;
  evening_forecast: string;
  summary_forecast: string;
  summary_when: string;
  min_temp: number;
  max_temp: number;
}
