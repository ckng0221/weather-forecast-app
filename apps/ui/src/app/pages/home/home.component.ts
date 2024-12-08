import {
  Component,
  computed,
  effect,
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { DatebarComponent } from '../../components/datebar/datebar.component';
import { IWeather } from '../../model/weather.type';
import { WeatherLocationPipe } from '../../pipes/weather-location.pipe';
import { WeatherTranslatePipe } from '../../pipes/weather-translate.pipe';
import { DateService } from '../../services/date.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    RouterLink,
    WeatherLocationPipe,
    WeatherTranslatePipe,
    DatebarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private dateService = inject(DateService);
  private weatherService = inject(WeatherService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.weatherService.getCurrentLocation.subscribe((location) => {
      if (!this.searchedLocation()) {
        this.searchedLocation.set(location);
      }
      this.currentLocation.set(location);
    });

    effect(() => {
      // update query parameters on search
      const queryParams = { location: this.searchedLocation() };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    });
  }

  currentLocation = signal('');

  todayDate = new Date().toISOString().slice(0, 10);
  currentDate: WritableSignal<string> = signal(
    this.dateService.getCurrentDate()
  );
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

    // Get query parameter
    this.route.queryParams.subscribe((params) => {
      const searchedLocation = params['location'];

      if (searchedLocation) {
        this.searchedLocation.set(searchedLocation);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.searchedLocation.set(this.currentLocation());
    console.log(this.searchedLocation);
  }

  changeDate(date: string) {
    this.currentDate.set(date);
  }
}
