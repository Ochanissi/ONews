import { createSelector } from 'reselect';
// import { AppState } from '../root-reducer';
// import { LinkStateProps } from '../../App';

// import { News } from '../news/news.types';

import { selectUserHidden } from '../user/user.selectors';

const selectNews = (state: any): any => state.news;

export const selectNewsArticles = createSelector(
  [selectNews, selectUserHidden],
  (news) => news.news.filter((x: any) => x.title && x.title.length > 65)
);

export const selectNewsSearch = createSelector([selectNews], (news) =>
  news.newsSearch.filter((x: any) => x.title && x.title.length > 65)
);
