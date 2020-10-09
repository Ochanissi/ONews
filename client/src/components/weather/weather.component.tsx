import React from 'react';

import WeatherSmall from '../weather-small/weather-small.component';

import './weather.styles.scss';

interface WeatherProps {}

class Weather extends React.Component<WeatherProps> {
  render(): JSX.Element {
    return (
      <nav role='navigation' className='weather'>
        <div id='menuToggle-weather'>
          <input type='checkbox' defaultChecked />

          <ion-icon name='cloudy-night'></ion-icon>

          <div id='menu-weather' className='weather__container'>
            <div className='weather__container--header'>
              <h3>Your local weather</h3>
              <div>
                <ion-icon name='location'></ion-icon>
              </div>
            </div>
            <hr></hr>
            <div className='weather__container--content'>
              <div className='weather__container--content--today'>
                <div className='weather__container--content--today--col'>
                  <div className='weather__container--content--today--col--1'>
                    Rain
                  </div>
                  <div className='weather__container--content--today--col--2'>
                    17&#176;C
                  </div>
                </div>
                <div className='weather__container--content--today--col'>
                  <ion-icon name='rainy-outline'></ion-icon>
                </div>
              </div>
              <div className='weather__container--content--week'>
                <WeatherSmall
                  day='Mon'
                  icon='rainy-outline'
                  max='17&#176;C'
                  min='17&#176;C'
                />
                <WeatherSmall
                  day='Tue'
                  icon='rainy-outline'
                  max='17&#176;C'
                  min='17&#176;C'
                />
                <WeatherSmall
                  day='Wed'
                  icon='rainy-outline'
                  max='17&#176;C'
                  min='17&#176;C'
                />
                <WeatherSmall
                  day='Thu'
                  icon='rainy-outline'
                  max='17&#176;C'
                  min='17&#176;C'
                />
                <WeatherSmall
                  day='Fri'
                  icon='rainy-outline'
                  max='17&#176;C'
                  min='17&#176;C'
                />
              </div>
            </div>
            <hr></hr>
            <div className='weather__container--footer'>
              <div className='weather__container--footer--degrees'>
                C | F | K
              </div>
              <div className='weather__container--footer--url'>
                More on{' '}
                <a
                  href='https://weathery.ochanissi.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Weathery
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Weather;
