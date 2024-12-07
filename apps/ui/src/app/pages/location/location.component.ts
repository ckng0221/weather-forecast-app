import { DatePipe, Location } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DatebarComponent } from '../../components/datebar/datebar.component';
import { IWeather } from '../../model/weather.type';
import { WeatherLocationPipe } from '../../pipes/weather-location.pipe';
import { WeatherTranslatePipe } from '../../pipes/weather-translate.pipe';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-location',
  imports: [
    MatCardModule,
    WeatherTranslatePipe,
    WeatherLocationPipe,
    MatDividerModule,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    DatebarComponent,
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  constructor(private route: ActivatedRoute, private _location: Location) {
    this.route.paramMap.subscribe((paramMap) => {
      this.identifier = paramMap.get('identifier');
      if (this.identifier) {
        this.weatherService
          .getForecasts({ identifier: this.identifier })
          .subscribe((weathers) => {
            this.weather.set(weathers[0]);
            const location = this.weather().location.location_name;
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://maps.google.com/maps/?q=' + location + '&output=embed'
            );
          });
      }
    });
  }
  weatherService = inject(WeatherService);
  sanitizer = inject(DomSanitizer);
  router = inject(Router);

  identifier: string | null = '';
  todayDate = new Date().toISOString().slice(0, 10);
  safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  weather: WritableSignal<IWeather> = signal({
    location: {
      location_id: '',
      location_name: '',
    },
    morning_forecast: '',
    afternoon_forecast: '',
    night_forecast: '',
    summary_forecast: '',
    summary_when: '',
    date: '',
    min_temp: 0,
    max_temp: 0,
  });

  ngOnInit() {}

  clickBack() {
    this._location.back();
    // this.router.navigate(['/']);
  }

  changeDate(date: string) {
    const newIdentifier = `${date}_${this.identifier?.slice(11)}`;
    this.router.navigate([`/locations/${newIdentifier}`]);
  }
}
