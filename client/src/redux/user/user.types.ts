import { News } from '../news/news.types';

// User News
export const SET_USER_CATEGORY = 'SET_USER_CATEGORY';
export const SET_USER_COUNTRY = 'SET_USER_COUNTRY';

// User Current User
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// User Sign In
export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

// User Sign Up
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// User Sign Out
export const SIGN_OUT = 'SIGN_OUT';

// User Saved
export const POST_USER_SAVED_START = 'POST_USER_SAVED_START';
export const POST_USER_SAVED_SUCCESS = 'POST_USER_SAVED_SUCCESS';
export const POST_USER_SAVED_FAILURE = 'POST_USER_SAVED_FAILURE';

export const GET_USER_SAVED_START = 'GET_USER_SAVED_START';
export const GET_USER_SAVED_SUCCESS = 'GET_USER_SAVED_SUCCESS';
export const GET_USER_SAVED_FAILURE = 'GET_USER_SAVED_FAILURE';

export const DELETE_USER_SAVED_START = 'DELETE_USER_SAVED_START';
export const DELETE_USER_SAVED_SUCCESS = 'DELETE_USER_SAVED_SUCCESS';
export const DELETE_USER_SAVED_FAILURE = 'DELETE_USER_SAVED_FAILURE';

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

// User Saved
interface PostUserSavedStart {
  type: typeof POST_USER_SAVED_START;
}

interface PostUserSavedSuccess {
  type: typeof POST_USER_SAVED_SUCCESS;
  payload: News[];
}

interface PostUserSavedFailure {
  type: typeof POST_USER_SAVED_FAILURE;
  payload: string;
}

interface GetUserSavedStart {
  type: typeof GET_USER_SAVED_START;
}

interface GetUserSavedSuccess {
  type: typeof GET_USER_SAVED_SUCCESS;
  payload: News[];
}

interface GetUserSavedFailure {
  type: typeof GET_USER_SAVED_FAILURE;
  payload: string;
}

interface DeleteUserSavedStart {
  type: typeof DELETE_USER_SAVED_START;
}

interface DeleteUserSavedSuccess {
  type: typeof DELETE_USER_SAVED_SUCCESS;
  payload: News[];
}

interface DeleteUserSavedFailure {
  type: typeof DELETE_USER_SAVED_FAILURE;
  payload: string;
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
  | SignOut
  | PostUserSavedStart
  | PostUserSavedSuccess
  | PostUserSavedFailure
  | GetUserSavedStart
  | GetUserSavedSuccess
  | GetUserSavedFailure
  | DeleteUserSavedStart
  | DeleteUserSavedSuccess
  | DeleteUserSavedFailure;
