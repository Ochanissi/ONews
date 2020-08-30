// NewsActionTypes = {};
export const FETCH_NEWS_START = 'FETCH_NEWS_START';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export interface News {
  source: {
    id: number;
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

export type NewsActionTYPES =
  | FetchNewsStartAction
  | FetchNewsSuccessAction
  | FetchNewsFailureAction;
