import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { catchError } from 'rxjs';
import { IWeather } from '../../model/weather';
import dayjs from 'dayjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  weatherService = inject(WeatherService);

  todayDate = dayjs().format('YYYY-MM-DD');
  weathers: WritableSignal<IWeather[]> = signal([]);
  filteredWeathers: Signal<IWeather[]> = computed(() => {
    return this.weathers().filter((weather) => weather.date === this.todayDate);
  });
  availableDates: Signal<string[]> = computed(() => {
    const dates = this.weathers().map((weather) => weather.date);
    return [...new Set(dates)].sort();
  });

  ngOnInit(): void {
    this.weatherService
      .getForecasts()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
      .subscribe((weathers) => {
        this.weathers.set(weathers);
      });
  }
}
