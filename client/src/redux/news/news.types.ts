// NewsActionTypes = {};
export const FETCH_NEWS_START = 'FETCH_NEWS_START';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const FETCH_NEWS_SEARCH_START = 'FETCH_NEWS_SEARCH_START';
export const FETCH_NEWS_SEARCH_SUCCESS = 'FETCH_NEWS_SEARCH_SUCCESS';
export const FETCH_NEWS_SEARCH_FAILURE = 'FETCH_NEWS_SEARCH_FAILURE';

export interface News {
  source: {
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsSearch {
  query: string;
  queryTitle: boolean;
  date: string;
  lang: string;
  sortBy: string;
}

// News
interface FetchNewsStartAction {
  type: typeof FETCH_NEWS_START;
}

interface FetchNewsSuccessAction {
  type: typeof FETCH_NEWS_SUCCESS;
  payload: News[];
}

interface FetchNewsFailureAction {
  type: typeof FETCH_NEWS_FAILURE;
  payload: string;
}

// News Search
interface FetchNewsSearchStartAction {
  type: typeof FETCH_NEWS_SEARCH_START;
}

interface FetchNewsSearchSuccessAction {
  type: typeof FETCH_NEWS_SEARCH_SUCCESS;
  payload: News[];
}

interface FetchNewsSearchFailureAction {
  type: typeof FETCH_NEWS_SEARCH_FAILURE;
  payload: string;
}

export type NewsActionTYPES =
  | FetchNewsStartAction
  | FetchNewsSuccessAction
  | FetchNewsFailureAction
  | FetchNewsSearchStartAction
  | FetchNewsSearchSuccessAction
  | FetchNewsSearchFailureAction;
