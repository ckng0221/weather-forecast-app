import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherTranslate',
})
export class WeatherTranslatePipe implements PipeTransform {
  transform(value: any, getTag: boolean = false): unknown {
    const [translate, tag] = translateWeather(value);
    if (getTag) {
      return tag;
    }
    return translate;
  }
}

function translateWeather(summary: string): [string, string] {
  let translate = '';
  let tag = '';

  switch (summary.toLowerCase()) {
    case 'berjerebu':
      translate = 'Hazy';
      tag = 'sunny';
      break;
    case 'tiada hujan':
      translate = 'No rain';
      tag = 'sunny';
      break;
    case 'hujan':
      translate = 'Rain';
      tag = 'rain';
      break;
    case 'hujan menyeluruh':
      translate = 'Rain in all areas';
      tag = 'rain';
      break;
    case 'hujan di beberapa tempat':
      translate = 'Scattered rain';
      tag = 'rain';
      break;
    case 'hujan di satu dua tempat':
      translate = 'Isolated rain';
      tag = 'rain';
      break;
    case 'hujan di satu dua tempat di kawasan pantai':
      translate = 'Isoalted rain over coastal areas';
      tag = 'rain';
      break;
    case 'hujan di satu dua tempat di kawasan pedalaman':
      translate = 'Isolated rain over inland areas';
      tag = 'rain';
      break;
    case 'hujan di kebanyakan tempat':
      translate = 'Rain in most areas';
      tag = 'rain';
      break;
    case 'ribut petir':
      translate = 'Thunderstorm';
      tag = 'thunderstorm';
      break;
    case 'ribut petir menyeluruh':
      translate = 'Thunderstorm in all areas';
      tag = 'thunderstorm';
      break;
    case 'ribut petir di kebanyakan tempat':
      translate = 'Thunderstorm in most areas';
      tag = 'thunderstorm';
      break;
    case 'ribut petir di beberapa tempat':
      translate = 'Scattered thunderstorms';
      tag = 'thunderstorm';
      break;
    case 'ribut petir di beberapa tempat di kawasan pedalaman':
      translate = 'Scattered thunderstorms over inland areas';
      tag = 'thunderstorm';
      break;
    case 'ribut petir di satu dua tempat':
      translate = 'Isolated thunderstorms';
      tag = 'thunderstorm';
      break;
    case 'ribut petir di satu dua tempat di kawasan pantai':
      translate = 'Isolated thunderstorms over coastal areas.';
      tag = 'thunderstorm';
      break;
    case 'ribut petir di satu dua tempat di kawasan pedalaman':
      translate = 'Isolated thunderstorms over inland areas';
      tag = 'thunderstorm';
      break;

    default:
      break;
  }

  return [translate, tag];
}
