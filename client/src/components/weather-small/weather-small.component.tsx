import React from 'react';

import './weather-small.styles.scss';

interface WeatherSmallProps {
  day: string;
  icon: string;
  max: string;
  min: string;
}

const WeatherSmall: React.FunctionComponent<WeatherSmallProps> = ({
  day,
  icon,
  max,
  min,
}): JSX.Element => {
  return (
    <div className='weather-small'>
      <div className='weather-small__header'>{day}</div>
      <div className='weather-small__icon'>
        <ion-icon name={`${icon}`}></ion-icon>
      </div>
      <div className='weather-small__max'>{max}</div>
      <div className='weather-small__min'>{min}</div>
    </div>
  );
};

export default WeatherSmall;
