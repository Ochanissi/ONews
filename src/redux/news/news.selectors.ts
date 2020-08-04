import { createSelector } from 'reselect';
// import { AppState } from '../root-reducer';
// import { LinkStateProps } from '../../App';

const selectNews = (state: any): any => state.news;

export const selectNewsArticles = createSelector(
  [selectNews],
  (news) => news.news
);
