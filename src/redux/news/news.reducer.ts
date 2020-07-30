import { NewsActionTypes } from './news.types';

const INITIAL_STATE = {
  isNewsFetching: false,
  news: [],

  errorMessage: null,
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NewsActionTypes.FETCH_NEWS_START:
      return {
        ...state,
        isNewsFetching: true,
      };

    case NewsActionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isNewsFetching: false,
        news: action.payload,
      };

    case NewsActionTypes.FETCH_NEWS_FAILURE:
      return {
        ...state,
        isNewsFetching: false,
        errorMessage: action.payload,
      };
  }
};
