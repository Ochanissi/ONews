import axios from 'axios';

import {
  News,
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  NewsActionTYPES,
} from './news.types';

import { Dispatch } from 'react';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

export const fetchNewsStart = (): NewsActionTYPES => ({
  type: FETCH_NEWS_START,
});

export const fetchNewsSuccess = (news: News[]): NewsActionTYPES => ({
  type: FETCH_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailure = (errorMessage: any): NewsActionTYPES => ({
  type: FETCH_NEWS_FAILURE,
  payload: errorMessage,
});

export const fetchNewsStartAsync = () => async (
  dispatch: Dispatch<NewsActionTYPES>
) => {
  try {
    dispatch(fetchNewsStart());

    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=ro&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`
    );

    dispatch(fetchNewsSuccess(res.data.articles));
  } catch (error) {
    dispatch(fetchNewsFailure(error));
  }
};
