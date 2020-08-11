import { SET_USER_CATEGORY, UserActionTYPES } from './user.types';

export const setUserCategory = (category: string): UserActionTYPES => ({
  type: SET_USER_CATEGORY,
  payload: category,
});
