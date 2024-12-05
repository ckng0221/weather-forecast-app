import { WeatherTranslatePipe } from './weather-translate.pipe';

describe('WeatherTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherTranslatePipe();
    expect(pipe).toBeTruthy();
  });
});
