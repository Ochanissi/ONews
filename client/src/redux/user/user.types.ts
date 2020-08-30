export const SET_USER_CATEGORY = 'SET_USER_CATEGORY';
export const SET_USER_COUNTRY = 'SET_USER_COUNTRY';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_OUT = 'SIGN_OUT';

export interface User {
  id: number;
  name: string;
  email: string;
  occupation: string;
  age: string;
  country: string;
  about: string;
  photo: string;
  joined: string;
}

// Set Guest User
interface SetUserCategoryAction {
  type: typeof SET_USER_CATEGORY;
  payload: string;
}

interface SetUserCountryAction {
  type: typeof SET_USER_COUNTRY;
  payload: string;
}

// Set Current User
interface SetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: User;
}

// Sign In
interface SignInStart {
  type: typeof SIGN_IN_START;
}

interface SignInSuccess {
  type: typeof SIGN_IN_SUCCESS;
  payload: User;
}

interface SignInFailure {
  type: typeof SIGN_IN_FAILURE;
  payload: string;
}

// Sign Up
interface SignUpStart {
  type: typeof SIGN_UP_START;
}

interface SignUpSuccess {
  type: typeof SIGN_UP_SUCCESS;
  payload: User;
}

interface SignUpFailure {
  type: typeof SIGN_UP_FAILURE;
  payload: string;
}

// Sign Out
interface SignOut {
  type: typeof SIGN_OUT;
}

export type UserActionTYPES =
  | SetUserCategoryAction
  | SetUserCountryAction
  | SetCurrentUser
  | SignInStart
  | SignInSuccess
  | SignInFailure
  | SignUpStart
  | SignUpSuccess
  | SignUpFailure
  | SignOut;
