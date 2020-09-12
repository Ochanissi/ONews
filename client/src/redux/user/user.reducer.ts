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
} from './user.types';
import { News } from '../news/news.types';

interface UserState {
  userCategory: string;
  userCountry: string;

  currentUser: User | null;

  userSaved: News[];
  userLiked: News[];

  errorMessage?: string;
}

const INITIAL_STATE: UserState = {
  userCategory: 'general',
  userCountry: 'ro',
  currentUser: null,
  userSaved: [],
  userLiked: [],
};

const userReducer = (
  state: UserState = INITIAL_STATE,
  action: UserActionTYPES
): UserState => {
  switch (action.type) {
    case SET_USER_CATEGORY:
      return {
        ...state,
        userCategory: action.payload,
      };

    case SET_USER_COUNTRY:
      return {
        ...state,
        userCountry: action.payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    // User Saved
    case GET_USER_SAVED_SUCCESS:
      return {
        ...state,
        userSaved: action.payload,
      };

    case GET_USER_SAVED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case POST_USER_SAVED_SUCCESS:
      return {
        ...state,
        userSaved: action.payload,
      };

    case POST_USER_SAVED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case DELETE_USER_SAVED_SUCCESS:
      return {
        ...state,
        userSaved: action.payload,
      };

    case DELETE_USER_SAVED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    // User Liked
    case GET_USER_LIKED_SUCCESS:
      return {
        ...state,
        userLiked: action.payload,
      };

    case GET_USER_LIKED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case POST_USER_LIKED_SUCCESS:
      return {
        ...state,
        userLiked: action.payload,
      };

    case POST_USER_LIKED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case DELETE_USER_LIKED_SUCCESS:
      return {
        ...state,
        userLiked: action.payload,
      };

    case DELETE_USER_LIKED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};

export default userReducer;
