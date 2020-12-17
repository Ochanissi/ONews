import React from 'react';

import './weather-small.styles.scss';

interface WeatherSmallProps {
  day: string;
  icon: string;
  max: number;
  min: number;
  unit: string;
}

const WeatherSmall: React.FunctionComponent<WeatherSmallProps> = ({
  day,
  icon,
  max,
  min,
  unit,
}): JSX.Element => {
  return (
    <div className="weather-small">
      <div className="weather-small__header">{day}</div>
      <div className="weather-small__icon">
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather Icon"
          className="weather__animation"
        ></img>
      </div>
      <div className="weather-small__max">
        {max}&#176;{unit}
      </div>
      <div className="weather-small__min">
        {min}&#176;{unit}
      </div>
    </div>
  );
};

export default WeatherSmall;
