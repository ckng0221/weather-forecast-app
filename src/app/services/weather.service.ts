import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWeather } from '../model/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl: string = 'https://api.data.gov.my';
  // private http: HttpClient;

  constructor(private http: HttpClient) {}

  getForecasts() {
    const url = `${this.baseUrl}/weather/forecast`;
    return this.http.get<IWeather[]>(url);
  }

  getDates() {
    const url = `${this.baseUrl}/weather/forecast`;
    const weather$ = this.http.get<IWeather[]>(url);
    weather$.subscribe((weathers) => {
      return weathers.map((weather) => weather.date);
    });
  }
}
