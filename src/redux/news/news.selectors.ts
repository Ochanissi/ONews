import { createSelector } from 'reselect';
// import { AppState } from '../root-reducer';
// import { LinkStateProps } from '../../App';

// import { News } from '../news/news.types';

const selectNews = (state: any): any => state.news;

export const selectNewsArticles = createSelector([selectNews], (news) =>
  news.news.filter((x: any) => x.title.length > 65)
);
