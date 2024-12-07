import { inject, Injectable, signal } from '@angular/core';
import { WeatherService } from './weather.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private currentDate = new Date().toISOString().slice(0, 10);
  // private availableDates: string[] = [];
  private availableDates = new BehaviorSubject([]);
  getAvailableDates = this.availableDates.asObservable();

  constructor() {
    // this.currentDate = new Date().toISOString().slice(0, 10);
    this.weatherService.getForecasts().subscribe((weathers) => {
      const dates = weathers.map((weather) => weather.date.slice(0, 10));
      this.setAvailableDates([...new Set(dates)].sort());
    });
  }
  weatherService = inject(WeatherService);

  getCurrentDate() {
    return this.currentDate;
  }
  setCurrentDate(date: string) {
    this.currentDate = date;
    // console.log(this.currentDate);
  }

  setAvailableDates(dates: any) {
    this.availableDates.next(dates);
  }
}
