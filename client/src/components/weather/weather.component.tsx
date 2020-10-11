import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectWeatherWeek } from '../../redux/weather/weather.selectors';

import WeatherSmall from '../weather-small/weather-small.component';

import { Weather } from '../../redux/weather/weather.types';

import { fetchWeatherStartAsync } from '../../redux/weather/weather.actions';


import './weather.styles.scss';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { setUserUnits } from '../../redux/user/user.actions';
import { selectUserUnits } from '../../redux/user/user.selectors';

interface WeatherProps { }

type Props = WeatherProps & LinkStateProps & LinkDispatchProps;

class WeatherContainer extends React.Component<Props> {
  componentDidMount() {

    const { userUnits, fetchWeatherStartAsync } = this.props

    const unitFormatted = userUnits === 'k' ? 'standard' : userUnits === 'f' ? 'imperial' : 'metric';

    fetchWeatherStartAsync('44.439663', '26.096306', unitFormatted);

  }

  // Checks if the component received new props and refetches data
  componentDidUpdate(prevProps: Props) {
    const { userUnits, fetchWeatherStartAsync } = this.props;

    const unitFormatted = userUnits === 'k' ? 'standard' : userUnits === 'f' ? 'imperial' : 'metric';


    if (userUnits !== prevProps.userUnits) {
      fetchWeatherStartAsync('44.439663', '26.096306', unitFormatted);
    }
  }

  handleUnits = (unit: string): any => {
    const { setUserUnits } = this.props;


    setUserUnits(unit);

  };


  render(): JSX.Element {
    const { userUnits, weatherWeek } = this.props


    let weatherTodayTemp, weatherTodayText = ''
    let weatherTodayIcon = '03d';

    if (weatherWeek.length) {
      weatherTodayTemp = Math.round(weatherWeek[0].temp.day);
      weatherTodayText = weatherWeek[0].weather[0].main;
      weatherTodayIcon = weatherWeek[0].weather[0].icon;  
    }

    // console.log(weatherWeek.length)

    // console.log('rendered');

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
                        {weatherTodayTemp}&#176;{userUnits.toUpperCase()}
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
                        day={String(new Date(dt * 1000)).split(' ')[0]}
                        icon={weather[0].icon}
                        min={Math.round(min)}
                        max={Math.round(max)}
                        unit={userUnits.toUpperCase()}
                      />))}

                  </div>
                </div>
                <hr></hr>
                <div className='weather__container--footer'>
                  <div className='weather__container--footer--degrees'>
                    <button onClick={() => this.handleUnits('c')} className={`${userUnits === 'c' ? 'weather__container--footer--degrees--selected' : ''}`}>C</button>
                    <span> | </span>
                    <button onClick={() => this.handleUnits('f')} className={`${userUnits === 'f' ? 'weather__container--footer--degrees--selected' : ''}`}>F</button>
                    <span> | </span>
                    <button onClick={() => this.handleUnits('k')} className={`${userUnits === 'k' ? 'weather__container--footer--degrees--selected' : ''}`}>K</button>

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
  userUnits: string

  weatherWeek: Weather[];
}

interface LinkDispatchProps {
  setUserUnits: (unit: string) => void;

  fetchWeatherStartAsync: (lat: string, lon: string, units: string) => void;
}


const mapStateToProps = createStructuredSelector({
  userUnits: selectUserUnits,
  weatherWeek: selectWeatherWeek,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  setUserUnits: (unit) => dispatch(setUserUnits(unit)),

  fetchWeatherStartAsync: (lat, lon, units) =>
    dispatch(fetchWeatherStartAsync(lat, lon, units)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
