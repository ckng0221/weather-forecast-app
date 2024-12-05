import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import { catchError } from 'rxjs';
import { IWeather } from '../../model/weather.type';
import { WeatherLocationPipe } from '../../pipes/weather-location.pipe';
import { WeatherTranslatePipe } from '../../pipes/weather-translate.pipe';
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
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    WeatherLocationPipe,
    WeatherTranslatePipe,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private weatherService = inject(WeatherService);
  constructor() {
    this.weatherService.getCurrentLocation.subscribe((location) => {
      this.searchedLocation.set(location);
      this.currentLocation.set(location);
    });
  }

  currentLocation = signal('');

  todayDate = dayjs().format('YYYY-MM-DD');
  currentDate: WritableSignal<string> = signal(this.todayDate);
  weathers: WritableSignal<IWeather[]> = signal([]);
  searchedLocation: WritableSignal<string> = signal(this.currentLocation());
  isLoading = signal(true);

  filteredWeathers: Signal<IWeather[]> = computed(() => {
    return this.weathers().filter(
      (weather) =>
        weather.date.slice(0, 10) === this.currentDate() &&
        weather.location.location_name
          .toLowerCase()
          .includes(this.searchedLocation().toLowerCase())
    );
  });
  availableDates: Signal<string[]> = computed(() => {
    const dates = this.weathers().map((weather) => weather.date.slice(0, 10));
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
        this.isLoading.set(false);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.searchedLocation.set(this.currentLocation());
  }

  chooseDate(date: string) {
    this.currentDate.set(date);
  }
}
