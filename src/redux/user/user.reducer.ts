const INITIAL_STATE = {
  currentUser: null,
};

// interface User {}

// type State = User[];

export interface User {
  id: string;
}

type Actions = {
  type: string;
  payload: User;
};

const userReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
