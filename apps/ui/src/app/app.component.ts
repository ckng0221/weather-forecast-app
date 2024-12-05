import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WeatherService } from './services/weather.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private weatherService = inject(WeatherService);
  constructor() {
    this.weatherService.getCurrentLocation.subscribe((location) =>
      this.currentLocation.set(location)
    );
  }
  title = 'weather-forecast';

  currentLocation = signal('');

  ngOnInit(): void {}
}
