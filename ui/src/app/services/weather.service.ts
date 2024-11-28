import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIpInfo, IWeather } from '../model/weather.type';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // private baseUrl: string = 'https://api.data.gov.my';
  private baseUrl: string = environment.apiBaseUrl;
  // private http: HttpClient;

  constructor(private http: HttpClient) {}

  getForecasts() {
    const url = `${this.baseUrl}/weathers`;
    return this.http.get<IWeather[]>(url);
  }

  getIpInfo() {
    const url = 'http://ipinfo.io';
    return this.http.get<IIpInfo>(url);
  }
}
