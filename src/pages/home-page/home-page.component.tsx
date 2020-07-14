import React from 'react';
import axios from 'axios';

import './home-page.styles.scss';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

class HomePage extends React.Component {
  componentDidMount() {
    axios({
      method: 'GET',
      url: `https://newsapi.org/v2/top-headlines?country=ro&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`,
    }).then((res) => console.log(res.data.articles));

    // console.log(process.env.REACT_APP_NEWSAPI_KEY);
  }

  render() {
    return (
      <div className='homepage'>
        <div>Kek</div>
      </div>
    );
  }
}

export default HomePage;
