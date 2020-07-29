import { createSelector } from 'reselect';

// const selectUser = (state) => state.user;

// export const selectCurrentUser = createSelector(
//   [selectUser],
//   (user) => user.selectCurrentUser
// );

import { User } from './user.reducer';

export const setCurrentUser = (user: User) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});
