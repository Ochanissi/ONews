import { createSelector } from "reselect";
// import { AppState } from '../root-reducer';
// import { LinkStateProps } from '../../App';

// import { News } from '../news/news.types';

const selectNews = (state: any): any => state.news;

export const selectNewsArticles = createSelector(
  [selectNews],
  // (news) => news.news.filter((x: any) => x.title && x.title.length > 65)
  (news) => news.news.filter((x: any) => x.title)
);

export const selectNewsSearch = createSelector([selectNews], (news) =>
  // news.newsSearch.filter((x: any) => x.title && x.title.length > 65)
  news.newsSearch.filter((x: any) => x.title)
);
