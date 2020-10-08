import React from 'react';

import './weather.styles.scss';

interface WeatherProps {}

class Weather extends React.Component<WeatherProps> {
  render(): JSX.Element {
    return (
      <nav role='navigation' className='weather'>
        <div id='menuToggle-weather'>
          <input type='checkbox' defaultChecked />

          <span></span>
          <span></span>
          <span></span>

          <ul id='menu-weather'>
            <a href='#'>
              <li>Home</li>
            </a>
            <a href='#'>
              <li>About</li>
            </a>
            <a href='#'>
              <li>Info</li>
            </a>
            <a href='#'>
              <li>Contact</li>
            </a>
            <a href='https://erikterwan.com/' target='_blank'>
              <li>Show me more</li>
            </a>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Weather;
