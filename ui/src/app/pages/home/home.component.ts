import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import dayjs from 'dayjs';
import { catchError } from 'rxjs';
import { IWeather } from '../../model/weather.type';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgClass,
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  weatherService = inject(WeatherService);

  todayDate = dayjs().format('YYYY-MM-DD');
  currentDate: WritableSignal<string> = signal(this.todayDate);
  weathers: WritableSignal<IWeather[]> = signal([]);
  searchedLocation: WritableSignal<string> = signal('');
  filteredWeathers: Signal<IWeather[]> = computed(() => {
    return this.weathers().filter(
      (weather) =>
        weather.date === this.currentDate() &&
        weather.location.location_id.startsWith('Ds') &&
        weather.location.location_name
          .toLowerCase()
          .includes(this.searchedLocation().toLowerCase())
    );
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

  chooseDate(date: string) {
    this.currentDate.set(date);
  }
}
