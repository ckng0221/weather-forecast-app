interface ILocation {
  location_id: string;
  location_name: string;
}

export interface IWeather {
  location: ILocation;
  date: string;
  morning_forecast: string;
  afternoon_forecast: string;
  night_forecast: string;
  summary_forecast: string;
  summary_when: string;
  min_temp: number;
  max_temp: number;
}
export interface IIpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export const locationType: any = {
  St: 'State',
  Rc: 'Recreation Centre',
  Ds: 'District',
  Tn: 'Town',
  Dv: 'Division',
};
