import {
  News,
  FETCH_NEWS_START,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  FETCH_NEWS_SEARCH_START,
  FETCH_NEWS_SEARCH_SUCCESS,
  FETCH_NEWS_SEARCH_FAILURE,
  NewsActionTYPES,
} from "./news.types";

export interface NewsState {
  isNewsFetching: boolean;
  news: News[];
  newsSearch: News[];
  errorMessage?: string;
}

const INITIAL_STATE: NewsState = {
  isNewsFetching: false,
  news: [],
  newsSearch: [],
};

const newsReducer = (
  state: NewsState = INITIAL_STATE,
  action: NewsActionTYPES
): NewsState => {
  switch (action.type) {
    // News
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

    // News Search
    case FETCH_NEWS_SEARCH_START:
      return {
        ...state,
        isNewsFetching: true,
      };

    case FETCH_NEWS_SEARCH_SUCCESS:
      return {
        ...state,
        isNewsFetching: false,
        newsSearch: action.payload,
      };

    case FETCH_NEWS_SEARCH_FAILURE:
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
