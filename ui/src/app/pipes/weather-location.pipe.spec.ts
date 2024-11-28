import { WeatherLocationPipe } from './weather-location.pipe';

describe('WeatherLocationPipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherLocationPipe();
    expect(pipe).toBeTruthy();
  });
});
