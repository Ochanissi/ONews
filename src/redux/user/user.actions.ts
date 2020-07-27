import { User } from './user.reducer';

export const setCurrentUser = (user: User) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});
