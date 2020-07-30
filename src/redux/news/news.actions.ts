import axios from 'axios';

import { NewsActionTypes } from './news.types';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

export const fetchNewsStart = () => ({
  type: NewsActionTypes.FETCH_NEWS_START,
});

export const fetchNewsSuccess = (news) => ({
  type: NewsActionTypes.FETCH_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailure = (errorMessage) => ({
  type: NewsActionTypes.FETCH_NEWS_FAILURE,
  payload: errorMessage,
});

export const fetchNewsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchNewsStart());

    axios({
      method: 'GET',
      url: `https://newsapi.org/v2/top-headlines?country=ro&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`,
    })
      .then((data) => dispatch(fetchNewsSuccess(data.results)))
      .catch((error) => dispatch(fetchNewsFailure(error.message)));

    //   fetch(
    //     `https://api.theNewsdb.org/3/News/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => dispatch(fetchNewsSuccess(data.results)))
    //     .catch((error) => dispatch(fetchNewsFailure(error.message)));
  };
};
