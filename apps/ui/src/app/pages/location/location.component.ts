import { DatePipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { IWeather } from '../../model/weather.type';
import { WeatherLocationPipe } from '../../pipes/weather-location.pipe';
import { WeatherTranslatePipe } from '../../pipes/weather-translate.pipe';
import { WeatherService } from '../../services/weather.service';
import { Location } from '@angular/common';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

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
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  constructor(private route: ActivatedRoute, private _location: Location) {}
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

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.identifier = paramMap.get('identifier');
      if (this.identifier) {
        this.weatherService
          .getForecasts({ identifier: this.identifier })
          .subscribe((weathers) => {
            this.weather.set(weathers[0]);
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://maps.google.com/maps/?q=' +
                this.weather().location.location_name +
                '&output=embed'
            );
          });
      }
    });
  }

  clickBack() {
    // this._location.back();
    this.router.navigate(['/']);
  }
}
