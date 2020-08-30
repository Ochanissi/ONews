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

interface UserState {
  userCategory: string;
  userCountry: string;

  currentUser: User | null;

  errorMessage?: string;
}

const INITIAL_STATE: UserState = {
  userCategory: 'general',
  userCountry: 'ro',
  currentUser: null,
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

    default:
      return state;
  }
};

export default userReducer;
