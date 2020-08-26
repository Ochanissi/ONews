import {
  SET_USER_CATEGORY,
  SET_USER_COUNTRY,
  UserActionTYPES,
} from './user.types';

interface UserState {
  userCategory: string;
  userCountry: string;
}

const INITIAL_STATE: UserState = {
  userCategory: 'general',
  userCountry: 'ro',
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

    default:
      return state;
  }
};

export default userReducer;
