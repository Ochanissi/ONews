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

export const fetchNewsStartAsync = (
  country: string,
  category: string
) => async (dispatch: Dispatch<NewsActionTYPES>) => {
  try {
    dispatch(fetchNewsStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}/news`,
      data: {
        country,
        category,
      },
    });

    // const res = await axios.get(
    //   `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.ONEWS_NEWSAPI_KEY}`
    // );

    // console.log(res);

    if (res.status === 200) {
      dispatch(fetchNewsSuccess(res.data));
    }
  } catch (error) {
    dispatch(fetchNewsFailure(error));
  }
};
