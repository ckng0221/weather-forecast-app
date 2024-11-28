import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherTranslate',
})
export class WeatherTranslatePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return translateWeather(value);
  }
}

function translateWeather(summary: string): string {
  let translated = '';

  switch (summary) {
    case 'Berjerebu':
      translated = 'Hazy';
      break;
    case 'Tiada hujan':
      translated = 'No rain';
      break;
    case 'Hujan':
      translated = 'Rain';
      break;
    case 'Hujan menyeluruh':
      translated = 'Rain in all areas';
      break;
    case 'Hujan di beberapa tempat':
      translated = 'Scattered rain';
      break;
    case 'Hujan di satu dua tempat':
      translated = 'Isolated rain';
      break;
    case 'Hujan di satu dua tempat di kawasan pantai':
      translated = 'Isoalted rain over coastal areas';
      break;
    case 'Hujan di satu dua tempat di kawasan pedalaman':
      translated = 'Isolated rain over inland areas';
      break;
    case 'Hujan di kebanyakan tempat':
      translated = 'Rain in most areas';
      break;
    case 'Ribut petir':
      translated = 'Thunderstorm';
      break;
    case 'Ribut petir menyeluruh':
      translated = 'Thunderstorm in all areas';
      break;
    case 'Ribut petir di kebanyakan tempat':
      translated = 'Thunderstorm in most areas';
      break;
    case 'Ribut petir di beberapa tempat':
      translated = 'Scattered thunderstorms';
      break;
    case 'Ribut petir di beberapa tempat di kawasan pedalaman':
      translated = 'Scattered thunderstorms over inland areas';
      break;
    case 'Ribut petir di satu dua tempat':
      translated = 'Isolated thunderstorms';
      break;
    case 'Ribut petir di satu dua tempat di kawasan pantai':
      translated = 'Isolated thunderstorms over coastal areas.';
      break;
    case 'Ribut petir di satu dua tempat di kawasan pedalaman':
      translated = 'Isolated thunderstorms over inland areas';
      break;

    default:
      break;
  }

  return translated;
}
