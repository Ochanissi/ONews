import axios from 'axios';
import { Dispatch } from 'react';

import {
  Weather,
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  WeatherActionTYPES,
} from './weather.types';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

// Weather
export const fetchWeatherStart = (): WeatherActionTYPES => ({
  type: FETCH_WEATHER_START,
});

export const fetchWeatherSuccess = (weather: Weather[]): WeatherActionTYPES => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});

export const fetchWeatherFailure = (errorMessage: string): WeatherActionTYPES => ({
  type: FETCH_WEATHER_FAILURE,
  payload: errorMessage,
});

export const fetchWeatherStartAsync = (
  lat: string | '44.439663',
  lon: string | '26.096306'
) => async (dispatch: Dispatch<WeatherActionTYPES>) => {
  try {
    dispatch(fetchWeatherStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}weather`,
      data: {
        lat,
        lon,
      },
    });

    if (res.status === 200) {
      dispatch(fetchWeatherSuccess(res.data));
    }
  } catch (error) {
    dispatch(fetchWeatherFailure(error.message));
  }
};