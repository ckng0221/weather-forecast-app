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

  getForecasts(
    options: {
      identifier?: string;
      location_id?: string;
      location_name?: string;
    } = {
      identifier: '',
      location_id: '',
      location_name: '',
    }
  ) {
    const url = `${this.baseUrl}/api/weathers`;

    let params = {};
    params = { ...params, startDate: new Date().toDateString() };
    if (options.identifier) {
      params = { ...params, identifier: options.identifier };
    } else if (options.location_id) {
      params = { ...params, locationId: options.location_id };
    } else if (options.location_name) {
      params = { ...params, locationName: options.location_name };
    }

    const httpOptions = {
      params,
    };
    return this.http.get<IWeather[]>(url, httpOptions);
  }

  getIpInfo() {
    const url = 'http://ipinfo.io';
    return this.http.get<IIpInfo>(url);
  }

  setCurrentLocation(location: string) {
    this.currentLocation.next(location);
  }
}
