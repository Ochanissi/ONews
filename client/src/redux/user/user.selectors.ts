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

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserSaved = createSelector(
  [selectUser],
  (user) => user.userSaved
);

export const selectUserLiked = createSelector(
  [selectUser],
  (user) => user.userLiked
);

export const selectUserDisliked = createSelector(
  [selectUser],
  (user) => user.userDisliked
);
