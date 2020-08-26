import {
  News,
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  NewsActionTYPES,
} from './news.types';

interface NewsState {
  isNewsFetching: boolean;
  news: News[];
  errorMessage?: any;
}

const INITIAL_STATE: NewsState = {
  isNewsFetching: false,
  news: [],
};

const newsReducer = (
  state: NewsState = INITIAL_STATE,
  action: NewsActionTYPES
): NewsState => {
  switch (action.type) {
    case FETCH_NEWS_START:
      return {
        ...state,
        isNewsFetching: true,
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isNewsFetching: false,
        news: action.payload,
      };

    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        isNewsFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default newsReducer;
