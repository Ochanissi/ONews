export interface News {
  source: {
    id: number | null;
    name: string | null;
  };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}

export const NewsActionTypes = {
  FETCH_NEWS_START: 'FETCH_NEWS_START',
  FETCH_NEWS_SUCCESS: 'FETCH_NEWS_SUCCESS',
  FETCH_NEWS_FAILURE: 'FETCH_NEWS_FAILURE',
};
