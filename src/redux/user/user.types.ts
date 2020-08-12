export const SET_USER_CATEGORY = 'SET_USER_CATEGORY';
export const SET_USER_COUNTRY = 'SET_USER_COUNTRY';

export interface SetUserCategoryAction {
  type: typeof SET_USER_CATEGORY;
  payload: string;
}

export interface SetUserCountryAction {
  type: typeof SET_USER_COUNTRY;
  payload: string;
}

export type UserActionTYPES = SetUserCategoryAction | SetUserCountryAction;
