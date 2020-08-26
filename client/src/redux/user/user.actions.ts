import {
  SET_USER_CATEGORY,
  SET_USER_COUNTRY,
  UserActionTYPES,
} from './user.types';

export const setUserCategory = (category: string): UserActionTYPES => ({
  type: SET_USER_CATEGORY,
  payload: category,
});

export const setUserCountry = (country: string): UserActionTYPES => ({
  type: SET_USER_COUNTRY,
  payload: country,
});
