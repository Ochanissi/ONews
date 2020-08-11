export const SET_USER_CATEGORY = 'SET_USER_CATEGORY';

export interface SetUserCategoryAction {
  type: typeof SET_USER_CATEGORY;
  payload: string;
}

export type UserActionTYPES = SetUserCategoryAction;
