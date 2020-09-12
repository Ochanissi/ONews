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
  GET_USER_SAVED_START,
  GET_USER_SAVED_SUCCESS,
  GET_USER_SAVED_FAILURE,
  POST_USER_SAVED_START,
  POST_USER_SAVED_SUCCESS,
  POST_USER_SAVED_FAILURE,
  DELETE_USER_SAVED_START,
  DELETE_USER_SAVED_SUCCESS,
  DELETE_USER_SAVED_FAILURE,
  GET_USER_LIKED_START,
  GET_USER_LIKED_SUCCESS,
  GET_USER_LIKED_FAILURE,
  POST_USER_LIKED_START,
  POST_USER_LIKED_SUCCESS,
  POST_USER_LIKED_FAILURE,
  DELETE_USER_LIKED_START,
  DELETE_USER_LIKED_SUCCESS,
  DELETE_USER_LIKED_FAILURE,
  UserActionTYPES,
  UserNews,
} from './user.types';
import { News } from '../news/news.types';

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

      // console.log(res.data.email);
      // getUserSavedStartAsync;

      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
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

export const signUpFailure = (errorMessage: string): UserActionTYPES => ({
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

// Get Saved
export const getUserSavedStart = (): UserActionTYPES => ({
  type: GET_USER_SAVED_START,
});

export const getUserSavedSuccess = (saved: News[]): UserActionTYPES => ({
  type: GET_USER_SAVED_SUCCESS,
  payload: saved,
});

export const getUserSavedFailure = (errorMessage: string): UserActionTYPES => ({
  type: GET_USER_SAVED_FAILURE,
  payload: errorMessage,
});

export const getUserSavedStartAsync = (email: string) => async (
  dispatch: Dispatch<UserActionTYPES>
) => {
  try {
    dispatch(getUserSavedStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}get-saved/`,
      data: {
        email,
      },
    });

    // console.log(res);

    if (res.status === 200) {
      dispatch(getUserSavedSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    }
  } catch (error) {
    dispatch(getUserSavedFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};

// Post Saved
export const postUserSavedStart = (): UserActionTYPES => ({
  type: POST_USER_SAVED_START,
});

export const postUserSavedSuccess = (saved: News[]): UserActionTYPES => ({
  type: POST_USER_SAVED_SUCCESS,
  payload: saved,
});

export const postUserSavedFailure = (
  errorMessage: string
): UserActionTYPES => ({
  type: POST_USER_SAVED_FAILURE,
  payload: errorMessage,
});

export const postUserSavedStartAsync = ({
  email,
  sourceName,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
}: UserNews) => async (dispatch: Dispatch<UserActionTYPES>) => {
  try {
    dispatch(postUserSavedStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}post-saved/`,
      data: {
        email,
        source: sourceName,
        title,
        description,
        url,
        image: urlToImage,
        date: publishedAt,
        content,
      },
    });

    // console.log(res);

    if (res.status === 200) {
      dispatch(postUserSavedSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    }
  } catch (error) {
    dispatch(postUserSavedFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};

// Delete Saved
export const deleteUserSavedStart = (): UserActionTYPES => ({
  type: DELETE_USER_SAVED_START,
});

export const deleteUserSavedSuccess = (saved: News[]): UserActionTYPES => ({
  type: DELETE_USER_SAVED_SUCCESS,
  payload: saved,
});

export const deleteUserSavedFailure = (
  errorMessage: string
): UserActionTYPES => ({
  type: DELETE_USER_SAVED_FAILURE,
  payload: errorMessage,
});

export const deleteUserSavedStartAsync = (
  email: string,
  title: string
) => async (dispatch: Dispatch<UserActionTYPES>) => {
  try {
    dispatch(deleteUserSavedStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}delete-saved/`,
      data: {
        email,
        title,
      },
    });

    // console.log(res);

    if (res.status === 200) {
      dispatch(deleteUserSavedSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    }
  } catch (error) {
    dispatch(deleteUserSavedFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};

// Get Liked
export const getUserLikedStart = (): UserActionTYPES => ({
  type: GET_USER_LIKED_START,
});

export const getUserLikedSuccess = (liked: News[]): UserActionTYPES => ({
  type: GET_USER_LIKED_SUCCESS,
  payload: liked,
});

export const getUserLikedFailure = (errorMessage: string): UserActionTYPES => ({
  type: GET_USER_LIKED_FAILURE,
  payload: errorMessage,
});

export const getUserLikedStartAsync = (email: string) => async (
  dispatch: Dispatch<UserActionTYPES>
) => {
  try {
    dispatch(getUserLikedStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}get-liked/`,
      data: {
        email,
      },
    });

    // console.log(res);

    if (res.status === 200) {
      dispatch(getUserLikedSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    }
  } catch (error) {
    dispatch(getUserLikedFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};

// Post Liked
export const postUserLikedStart = (): UserActionTYPES => ({
  type: POST_USER_LIKED_START,
});

export const postUserLikedSuccess = (liked: News[]): UserActionTYPES => ({
  type: POST_USER_LIKED_SUCCESS,
  payload: liked,
});

export const postUserLikedFailure = (
  errorMessage: string
): UserActionTYPES => ({
  type: POST_USER_LIKED_FAILURE,
  payload: errorMessage,
});

export const postUserLikedStartAsync = ({
  email,
  sourceName,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
}: UserNews) => async (dispatch: Dispatch<UserActionTYPES>) => {
  try {
    dispatch(postUserLikedStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}post-liked/`,
      data: {
        email,
        source: sourceName,
        title,
        description,
        url,
        image: urlToImage,
        date: publishedAt,
        content,
      },
    });

    // console.log(res);

    if (res.status === 200) {
      dispatch(postUserLikedSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    }
  } catch (error) {
    dispatch(postUserLikedFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};

// Delete Liked
export const deleteUserLikedStart = (): UserActionTYPES => ({
  type: DELETE_USER_LIKED_START,
});

export const deleteUserLikedSuccess = (liked: News[]): UserActionTYPES => ({
  type: DELETE_USER_LIKED_SUCCESS,
  payload: liked,
});

export const deleteUserLikedFailure = (
  errorMessage: string
): UserActionTYPES => ({
  type: DELETE_USER_LIKED_FAILURE,
  payload: errorMessage,
});

export const deleteUserLikedStartAsync = (
  email: string,
  title: string
) => async (dispatch: Dispatch<UserActionTYPES>) => {
  try {
    dispatch(deleteUserLikedStart());

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ONEWS_BACKEND_URL}delete-liked/`,
      data: {
        email,
        title,
      },
    });

    // console.log(res);

    if (res.status === 200) {
      dispatch(deleteUserLikedSuccess(res.data));
      // Toast.success(`Welcome back ${res.data.name}!`, 1500);
    }
  } catch (error) {
    dispatch(deleteUserLikedFailure(error.message));
    // Toast.fail(`Failed signing in!`, 1500);
  }
};
