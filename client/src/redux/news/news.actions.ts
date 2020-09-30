import axios from 'axios';
import { Dispatch } from 'react';

import {
  News,
  NewsSearch,
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  FETCH_NEWS_SEARCH_START,
  FETCH_NEWS_SEARCH_SUCCESS,
  FETCH_NEWS_SEARCH_FAILURE,
  NewsActionTYPES,
} from './news.types';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

// News
export const fetchNewsStart = (): NewsActionTYPES => ({
  type: FETCH_NEWS_START,
});

export const fetchNewsSuccess = (news: News[]): NewsActionTYPES => ({
  type: FETCH_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailure = (errorMessage: string): NewsActionTYPES => ({
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
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}news`,
      data: {
        country,
        category,
      },
    });

    if (res.status === 200) {
      dispatch(fetchNewsSuccess(res.data));
    }
  } catch (error) {
    dispatch(fetchNewsFailure(error.message));
  }
};

// News Search
export const fetchNewsSearchStart = (): NewsActionTYPES => ({
  type: FETCH_NEWS_SEARCH_START,
});

export const fetchNewsSearchSuccess = (
  newsSearch: News[]
): NewsActionTYPES => ({
  type: FETCH_NEWS_SEARCH_SUCCESS,
  payload: newsSearch,
});

export const fetchNewsSearchFailure = (
  errorMessage: string
): NewsActionTYPES => ({
  type: FETCH_NEWS_SEARCH_FAILURE,
  payload: errorMessage,
});

export const fetchNewsSearchStartAsync = ({
  query,
  queryTitle = false,
  date = 'anytime',
  lang = 'en',
  sortBy = 'publishedAt',
}: NewsSearch) => async (dispatch: Dispatch<NewsActionTYPES>) => {
  try {
    dispatch(fetchNewsSearchStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}search`,
      data: {
        query,
        queryTitle,
        date,
        lang,
        sortBy,
      },
    });

    if (res.status === 200) {
      dispatch(fetchNewsSearchSuccess(res.data));
    }
  } catch (error) {
    dispatch(fetchNewsSearchFailure(error.message));
  }
};
