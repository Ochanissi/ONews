export const FETCH_WEATHER_START = 'FETCH_WEATHER_START';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export interface Weather {
  dt: number,
  sunrise: number,
  sunset: number,
  temp: {
      day: number,
      min: number,
      max: number,
      night: number,
      eve: number,
      morn: number
  },
  feels_like: {
      day: number,
      night: number,
      eve: number,
      morn: number
  },
  pressure: number,
  humidity: number,
  dew_point: number,
  wind_speed: number,
  wind_deg: number,
  weather: [
      {
          id: number,
          main: string,
          description: string,
          icon: string
      }
  ],
  clouds: number,
  pop: number,
  uvi: number
}

// Weather
interface FetchWeatherStartAction {
  type: typeof FETCH_WEATHER_START;
}

interface FetchWeatherSuccessAction {
  type: typeof FETCH_WEATHER_SUCCESS;
  payload: Weather[];
}

interface FetchWeatherFailureAction {
  type: typeof FETCH_WEATHER_FAILURE;
  payload: string;
}

export type WeatherActionTYPES =
  | FetchWeatherStartAction
  | FetchWeatherSuccessAction
  | FetchWeatherFailureAction;