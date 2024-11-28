import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherService } from './services/weather.service';
import { catchError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    HomeComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-forecast';
  weatherService = inject(WeatherService);

  currentLocation = signal('');

  ngOnInit(): void {
    this.weatherService
      .getIpInfo()
      .pipe(
        catchError((err) => {
          console.error(err);
          this.currentLocation.set('Kuala Lumpur');
          throw err;
        })
      )
      .subscribe((location) => {
        this.currentLocation.set(location.city);
      });
  }
}
