import axios from 'axios';
import { Dispatch } from 'react';

import {
  User,
  SET_USER_CATEGORY,
  SET_USER_COUNTRY,
  SET_CURRENT_USER,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT,
  UserActionTYPES,
} from './user.types';

// Set Guest User
export const setUserCategory = (category: string): UserActionTYPES => ({
  type: SET_USER_CATEGORY,
  payload: category,
});

export const setUserCountry = (country: string): UserActionTYPES => ({
  type: SET_USER_COUNTRY,
  payload: country,
});

// Set Current User
export const setCurrentUser = (user: User): UserActionTYPES => ({
  type: SET_CURRENT_USER,
  payload: user,
});

// Sign In
export const signInStart = (): UserActionTYPES => ({
  type: SIGN_IN_START,
});

export const signInSuccess = (currentUser: User): UserActionTYPES => ({
  type: SIGN_IN_SUCCESS,
  payload: currentUser,
});

export const signInFailure = (errorMessage: any): UserActionTYPES => ({
  type: SIGN_IN_FAILURE,
  payload: errorMessage,
});

export const signInStartAsync = (email: string, password: string) => async (
  dispatch: Dispatch<UserActionTYPES>
) => {
  try {
    dispatch(signInStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}sign-in`,
      data: {
        email,
        password,
      },
    });

    if (res.data.id) {
      dispatch(signInSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    } else {
      dispatch(signInFailure(res.data));
      // Toast.fail(res.data, 1500);
    }
  } catch (error) {
    dispatch(signInFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};

// Sign Up
export const signUpStart = (): UserActionTYPES => ({
  type: SIGN_UP_START,
});

export const signUpSuccess = (currentUser: User): UserActionTYPES => ({
  type: SIGN_UP_SUCCESS,
  payload: currentUser,
});

export const signUpFailure = (errorMessage: any): UserActionTYPES => ({
  type: SIGN_UP_FAILURE,
  payload: errorMessage,
});

export const signUpStartAsync = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Dispatch<UserActionTYPES>) => {
  try {
    dispatch(signInStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}sign-up`,
      data: {
        name,
        email,
        password,
      },
    });

    if (res.data.id) {
      dispatch(signUpSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    } else {
      dispatch(signUpFailure(res.data));
      // Toast.fail(res.data, 1500);
    }
  } catch (error) {
    dispatch(signUpFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};

// Sign Out
export const signOut = (): UserActionTYPES => ({
  type: SIGN_OUT,
});
