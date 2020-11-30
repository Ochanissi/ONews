import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectWeatherWeek } from "../../redux/weather/weather.selectors";

import WeatherSmall from "../weather-small/weather-small.component";

import { Weather } from "../../redux/weather/weather.types";

import { fetchWeatherStartAsync } from "../../redux/weather/weather.actions";

import "./weather.styles.scss";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../redux/store";
import { setUserCoords, setUserUnits } from "../../redux/user/user.actions";
import {
  selectUserCoords,
  selectUserUnits,
} from "../../redux/user/user.selectors";
import { UserCoords } from "../../redux/user/user.types";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Toast from "light-toast";

interface WeatherProps extends RouteComponentProps {}

interface WeatherState {
  isChecked: boolean;
}

type Props = WeatherProps & LinkStateProps & LinkDispatchProps;

class WeatherContainer extends React.Component<Props, WeatherState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isChecked: true,
    };
  }

  componentDidMount() {
    const {
      userUnits,
      userCoords: { lat, lng },
      fetchWeatherStartAsync,
    } = this.props;

    const unitFormatted =
      userUnits === "k"
        ? "standard"
        : userUnits === "f"
        ? "imperial"
        : "metric";

    fetchWeatherStartAsync(lat, lng, unitFormatted);
  }

  // Checks if the component received new props and refetches data
  componentDidUpdate(prevProps: Props) {
    const {
      userUnits,
      userCoords: { lat, lng },
      fetchWeatherStartAsync,
    } = this.props;

    const unitFormatted =
      userUnits === "k"
        ? "standard"
        : userUnits === "f"
        ? "imperial"
        : "metric";

    // if units have been updated, or the geolocation from HTML5
    if (
      userUnits !== prevProps.userUnits ||
      lat !== prevProps.userCoords.lat ||
      lng !== prevProps.userCoords.lng
    ) {
      fetchWeatherStartAsync(lat, lng, unitFormatted);
    }
  }

  handleUnits = (
    event: React.MouseEvent<HTMLButtonElement>,
    unit: string
  ): void => {
    event.preventDefault();

    const { setUserUnits } = this.props;

    setUserUnits(unit);

    // Toast.info('Preference saved.', 1000);
  };

  handleLocation = () => {
    const { userUnits, setUserCoords } = this.props;

    // const unitFormatted =
    //   userUnits === 'k'
    //     ? 'standard'
    //     : userUnits === 'f'
    //     ? 'imperial'
    //     : 'metric';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const { lat, lng } = {
          lat: String(position.coords.latitude),
          lng: String(position.coords.longitude),
        };

        setUserCoords({ lat, lng });
      });
    } else {
      Toast.fail("Failed to find location.", 1000);
    }
  };

  handleChecked = () => {
    const { isChecked } = this.state;

    if (document.querySelector(".isWeatherChecked")) {
      const ele = document.querySelector(
        ".isWeatherChecked"
      ) as HTMLInputElement;

      ele.checked = !isChecked;

      this.setState({
        isChecked: !isChecked,
      });
    }

    console.log(isChecked);
  };

  render(): JSX.Element {
    const { userUnits, weatherWeek } = this.props;
    const { isChecked } = this.state;

    let weatherTodayTemp,
      weatherTodayText = "";
    let weatherTodayIcon = "03d";

    if (weatherWeek.length) {
      weatherTodayTemp = Math.round(weatherWeek[0].temp.day);
      weatherTodayText = weatherWeek[0].weather[0].main;
      weatherTodayIcon = weatherWeek[0].weather[0].icon;
    }

    // console.log(weatherWeek.length)

    // console.log(isChecked);

    // console.log(this.props);

    return (
      <nav role="navigation" className="weather">
        {weatherWeek.length ? (
          <div className="menu-weather">
            <button
              className={`isWeatherChecked ${
                isChecked ? "isWeatherChecked--checked" : ""
              }`}
              onClick={this.handleChecked}
            >
              <ion-icon name="cloudy-night"></ion-icon>
            </button>
            <div
              className={`weather__container ${
                isChecked ? "weather__container--checked" : ""
              }`}
            >
              <div className="weather__container--header">
                <h3>Your local weather</h3>
                <div>
                  <button onClick={this.handleLocation}>
                    <ion-icon name="location"></ion-icon>
                  </button>
                </div>
              </div>
              <hr></hr>
              <div className="weather__container--content">
                <div className="weather__container--content--today">
                  <div className="weather__container--content--today--col">
                    <div className="weather__container--content--today--col--1">
                      {weatherTodayText}
                    </div>
                    <div className="weather__container--content--today--col--2">
                      {weatherTodayTemp}&#176;{userUnits.toUpperCase()}
                    </div>
                  </div>
                  <div className="weather__container--content--today--col">
                    {/* <ion-icon name='rainy-outline'></ion-icon> */}
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherTodayIcon}@2x.png`}
                      alt="Weather Icon"
                      className="weather__animation"
                    ></img>
                  </div>
                </div>
                <div className="weather__container--content--week">
                  {weatherWeek.map(({ dt, weather, temp: { min, max } }, i) => (
                    <WeatherSmall
                      key={`${i + dt}`}
                      day={String(new Date(dt * 1000)).split(" ")[0]}
                      icon={weather[0].icon}
                      min={Math.round(min)}
                      max={Math.round(max)}
                      unit={userUnits.toUpperCase()}
                    />
                  ))}
                </div>
              </div>
              <hr></hr>
              <div className="weather__container--footer">
                <div className="weather__container--footer--degrees">
                  <button
                    onClick={(event) => this.handleUnits(event, "c")}
                    className={`${
                      userUnits === "c"
                        ? "weather__container--footer--degrees--selected"
                        : ""
                    }`}
                  >
                    C
                  </button>
                  <span> | </span>
                  <button
                    onClick={(event) => this.handleUnits(event, "f")}
                    className={`${
                      userUnits === "f"
                        ? "weather__container--footer--degrees--selected"
                        : ""
                    }`}
                  >
                    F
                  </button>
                  <span> | </span>
                  <button
                    onClick={(event) => this.handleUnits(event, "k")}
                    className={`${
                      userUnits === "k"
                        ? "weather__container--footer--degrees--selected"
                        : ""
                    }`}
                  >
                    K
                  </button>
                </div>
                <div className="weather__container--footer--url">
                  More on{" "}
                  <a
                    href="https://weathery.ochanissi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Weathery
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="menuToggle-weather">
            <button
              className="isWeatherChecked"
              onClick={this.handleChecked}
              disabled
            >
              <ion-icon name="cloudy-night"></ion-icon>
            </button>
          </div>
        )}
      </nav>
    );
  }
}

interface LinkStateProps {
  userUnits: string;
  userCoords: UserCoords;

  weatherWeek: Weather[];
}

interface LinkDispatchProps {
  setUserUnits: (unit: string) => void;
  setUserCoords: (coords: UserCoords) => void;

  fetchWeatherStartAsync: (lat: string, lon: string, units: string) => void;
}

const mapStateToProps = createStructuredSelector({
  userUnits: selectUserUnits,
  userCoords: selectUserCoords,

  weatherWeek: selectWeatherWeek,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  setUserUnits: (unit) => dispatch(setUserUnits(unit)),
  setUserCoords: (coords) => dispatch(setUserCoords(coords)),

  fetchWeatherStartAsync: (lat, lon, units) =>
    dispatch(fetchWeatherStartAsync(lat, lon, units)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WeatherContainer)
);
