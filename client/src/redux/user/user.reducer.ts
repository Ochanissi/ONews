import {
  User,
  SET_USER_CATEGORY,
  SET_USER_COUNTRY,
  SET_USER_UNITS,
  SET_USER_COORDS,
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
  GET_USER_DISLIKED_START,
  GET_USER_DISLIKED_SUCCESS,
  GET_USER_DISLIKED_FAILURE,
  POST_USER_DISLIKED_START,
  POST_USER_DISLIKED_SUCCESS,
  POST_USER_DISLIKED_FAILURE,
  DELETE_USER_DISLIKED_START,
  DELETE_USER_DISLIKED_SUCCESS,
  DELETE_USER_DISLIKED_FAILURE,
  GET_USER_HIDDEN_START,
  GET_USER_HIDDEN_SUCCESS,
  GET_USER_HIDDEN_FAILURE,
  POST_USER_HIDDEN_START,
  POST_USER_HIDDEN_SUCCESS,
  POST_USER_HIDDEN_FAILURE,
  DELETE_USER_HIDDEN_START,
  DELETE_USER_HIDDEN_SUCCESS,
  DELETE_USER_HIDDEN_FAILURE,
  GET_USER_SEARCHES_START,
  GET_USER_SEARCHES_SUCCESS,
  GET_USER_SEARCHES_FAILURE,
  POST_USER_SEARCHES_START,
  POST_USER_SEARCHES_SUCCESS,
  POST_USER_SEARCHES_FAILURE,
  DELETE_USER_SEARCHES_START,
  DELETE_USER_SEARCHES_SUCCESS,
  DELETE_USER_SEARCHES_FAILURE,
  UPDATE_USER_DATA_START,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  UPDATE_USER_PASSWORD_START,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILURE,
  UserActionTYPES,
  UserCoords,
} from './user.types';
import { News } from '../news/news.types';

interface UserState {
  userCategory: string;
  userCountry: string;
  userUnits: string;
  userCoords: UserCoords;

  currentUser: User | null;

  userSaved: News[];
  userLiked: News[];
  userDisliked: News[];
  userHidden: [string?];
  userSearches: [string?];

  errorMessage?: string;
}

const INITIAL_STATE: UserState = {
  userCategory: 'general',
  userCountry: 'ro',
  userUnits: 'c',
  userCoords: {
    lat: '44.439663',
    lng: '26.096306',
  },
  currentUser: null,
  userSaved: [],
  userLiked: [],
  userDisliked: [],
  userHidden: [],
  userSearches: [],
};

const userReducer = (
  state: UserState = INITIAL_STATE,
  action: UserActionTYPES
): UserState => {
  switch (action.type) {
    // User News
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

    // User Weather
    case SET_USER_UNITS:
      return {
        ...state,
        userUnits: action.payload,
      };

    // User Coords
    case SET_USER_COORDS:
      return {
        ...state,
        userCoords: action.payload,
      };

    // User Current
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

    case SIGN_OUT:
      return {
        ...state,
        currentUser: null,
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

    // User Disliked
    case GET_USER_DISLIKED_SUCCESS:
      return {
        ...state,
        userDisliked: action.payload,
      };

    case GET_USER_DISLIKED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case POST_USER_DISLIKED_SUCCESS:
      return {
        ...state,
        userDisliked: action.payload,
      };

    case POST_USER_DISLIKED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case DELETE_USER_DISLIKED_SUCCESS:
      return {
        ...state,
        userDisliked: action.payload,
      };

    case DELETE_USER_DISLIKED_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    // User Hidden
    case GET_USER_HIDDEN_SUCCESS:
      return {
        ...state,
        userHidden: action.payload,
      };

    case GET_USER_HIDDEN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case POST_USER_HIDDEN_SUCCESS:
      return {
        ...state,
        userHidden: action.payload,
      };

    case POST_USER_HIDDEN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case DELETE_USER_HIDDEN_SUCCESS:
      return {
        ...state,
        userHidden: action.payload,
      };

    case DELETE_USER_HIDDEN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    // User Searches
    case GET_USER_SEARCHES_SUCCESS:
      return {
        ...state,
        userSearches: action.payload,
      };

    case GET_USER_SEARCHES_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case POST_USER_SEARCHES_SUCCESS:
      return {
        ...state,
        userSearches: action.payload,
      };

    case POST_USER_SEARCHES_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case DELETE_USER_SEARCHES_SUCCESS:
      return {
        ...state,
        userSearches: action.payload,
      };

    case DELETE_USER_SEARCHES_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    // User Data
    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UPDATE_USER_DATA_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    // User Password
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_USER_PASSWORD_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
