import { Pipe, PipeTransform } from '@angular/core';
import { locationType } from '../model/weather.type';

@Pipe({
  name: 'weatherLocation',
})
export class WeatherLocationPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return locationType[value.slice(0, 2)];
  }
}
