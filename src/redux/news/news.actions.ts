import axios from 'axios';

import { News, NewsActionTypes } from './news.types';
import { Dispatch } from 'react';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

// export interface FetchNewsStartAction {
//   type: typeof NewsActionTypes.FETCH_NEWS_START;
// }

export interface FetchNewsSuccessAction {
  type: typeof NewsActionTypes.FETCH_NEWS_SUCCESS;
  payload: News;
}

export interface FetchNewsFailureAction {
  type: typeof NewsActionTypes.FETCH_NEWS_FAILURE;
  payload: string | News | null;
}

export type NewsActionTypesT =
  // | FetchNewsStartAction
  FetchNewsSuccessAction | FetchNewsFailureAction;

export type AppActions = NewsActionTypesT;

export const fetchNewsStart = () => ({
  type: NewsActionTypes.FETCH_NEWS_START,
});

export const fetchNewsSuccess = (news: News): AppActions => ({
  type: NewsActionTypes.FETCH_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailure = (
  errorMessage: string | News | null
): AppActions => ({
  type: NewsActionTypes.FETCH_NEWS_FAILURE,
  payload: errorMessage,
});

export const fetchNewsStartAsync = () => {
  return (dispatch: Dispatch<AppActions>) => {
    // dispatch(fetchNewsStart());

    axios({
      method: 'GET',
      url: `https://newsapi.org/v2/top-headlines?country=ro&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`,
    })
      .then((data) => dispatch(fetchNewsSuccess(data as any)))
      .catch((error) => dispatch(fetchNewsFailure(error as any)));

    //   fetch(
    //     `https://api.theNewsdb.org/3/News/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => dispatch(fetchNewsSuccess(data.results)))
    //     .catch((error) => dispatch(fetchNewsFailure(error.message)));
  };
};
