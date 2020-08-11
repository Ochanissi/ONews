import { SET_USER_CATEGORY, UserActionTYPES } from './user.types';

interface UserState {
  userCategory: string;
}

const INITIAL_STATE: UserState = {
  userCategory: 'general',
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

    default:
      return state;
  }
};

export default userReducer;
