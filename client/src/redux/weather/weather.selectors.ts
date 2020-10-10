import { createSelector } from 'reselect';

const selectWeather = (state: any): any => state.weather;

export const selectWeatherToday = createSelector(
  [selectWeather],
  (weather) => weather.weather[0]
);

export const selectWeatherWeek = createSelector(
  [selectWeather],
  (weather) => weather.weather
);