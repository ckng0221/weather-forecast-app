import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIpInfo, IWeather } from '../model/weather.type';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // private baseUrl: string = 'https://api.data.gov.my';
  private baseUrl: string = environment.apiBaseUrl;
  private currentLocation = new BehaviorSubject('');
  getCurrentLocation = this.currentLocation.asObservable();

  // singleton, only called once
  constructor(private http: HttpClient) {
    this.getIpInfo()
      .pipe(
        catchError((err) => {
          console.error(err);
          this.setCurrentLocation('Kuala Lumpur');
          throw err;
        })
      )
      .subscribe((location) => {
        this.setCurrentLocation(location.city);
        // console.log('updated locations');
        // console.log('location', this.currentLocation.value);
      });
  }

  getForecasts() {
    const url = `${this.baseUrl}/api/weathers`;

    return this.http.get<IWeather[]>(url, {
      params: {
        startDate: new Date().toDateString(),
      },
    });
  }

  getIpInfo() {
    const url = 'http://ipinfo.io';
    return this.http.get<IIpInfo>(url);
  }

  setCurrentLocation(location: string) {
    this.currentLocation.next(location);
  }
}
