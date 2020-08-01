import { News, NewsActionTypes } from './news.types';
import { NewsActionTypesT } from './news.actions';

interface NewsState {
  isNewsFetching: boolean;
  news: string | News | null | [];
  errorMessage: string | News | null;
}

const INITIAL_STATE: NewsState = {
  isNewsFetching: false,
  news: [],

  errorMessage: null,
};

const newsReducer = (
  state = INITIAL_STATE,
  action: NewsActionTypesT
): NewsState => {
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

    default:
      return state;
  }
};

export default newsReducer;
