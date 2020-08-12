import { createSelector } from 'reselect';
// import { AppState } from '../root-reducer';
// import { LinkStateProps } from '../../App';

const selectUser = (state: any): any => state.user;

export const selectUserCategory = createSelector(
  [selectUser],
  (user) => user.userCategory
);

export const selectUserCountry = createSelector(
  [selectUser],
  (user) => user.userCountry
);
