import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectWeatherToday, selectWeatherWeek } from '../../redux/weather/weather.selectors';

import WeatherSmall from '../weather-small/weather-small.component';

import { Weather } from '../../redux/weather/weather.types';

import './weather.styles.scss';

interface WeatherProps { }

type Props = WeatherProps & LinkStateProps;

class WeatherContainer extends React.Component<Props> {


  render(): JSX.Element {
    const { weatherWeek } = this.props


    let weatherTodayTemp, weatherTodayText = ''
    let weatherTodayIcon = '03d';

    if (weatherWeek.length) {
      weatherTodayTemp = Math.round(weatherWeek[0].temp.day);
      weatherTodayText = weatherWeek[0].weather[0].main;
      weatherTodayIcon = weatherWeek[0].weather[0].icon;

      // console.log(weatherWeek[0].temp)
    }

    // console.log(weatherWeek.length)

    return (
      <nav role='navigation' className='weather'>
        {
          weatherWeek.length ? (
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
                        {weatherTodayText}
                      </div>
                      <div className='weather__container--content--today--col--2'>
                        {weatherTodayTemp}&#176;C
                </div>
                    </div>
                    <div className='weather__container--content--today--col'>
                      {/* <ion-icon name='rainy-outline'></ion-icon> */}
                      <img src={`http://openweathermap.org/img/wn/${weatherTodayIcon}@2x.png`} alt='Weather Icon'></img>
                    </div>
                  </div>
                  <div className='weather__container--content--week'>
                    {weatherWeek.map(({ dt, weather, temp: { min, max } }, i) => (
                      <WeatherSmall
                        key={`${i + dt}`}
                        day='Mon'
                        icon={weather[0].icon}
                        min={Math.round(min)}
                        max={Math.round(max)}
                        unit='C'
                      />))}

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
            </div>) : (
              <div id='menuToggle-weather'>
                <input type='checkbox' disabled />
                <ion-icon name='cloudy-night'></ion-icon>
              </div>
            )
        }
      </nav>
    )
  }
}

interface LinkStateProps {
  weatherWeek: Weather[];
}


const mapStateToProps = createStructuredSelector({
  weatherWeek: selectWeatherWeek,
});

export default connect(mapStateToProps)(WeatherContainer);
