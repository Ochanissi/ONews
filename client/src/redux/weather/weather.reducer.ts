import {
  Weather,
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  WeatherActionTYPES,
} from "./weather.types";

export interface WeatherState {
  isWeatherFetching: boolean;
  weather: Weather[];
  errorMessage?: string;
}

const INITIAL_STATE: WeatherState = {
  isWeatherFetching: false,
  weather: [],
};

const weatherReducer = (
  state: WeatherState = INITIAL_STATE,
  action: WeatherActionTYPES
): WeatherState => {
  switch (action.type) {
    // Weather
    case FETCH_WEATHER_START:
      return {
        ...state,
        isWeatherFetching: true,
      };

    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        isWeatherFetching: false,
        weather: action.payload,
      };

    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        isWeatherFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
