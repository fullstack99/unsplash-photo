import * as types from '../actions/types';

const INITIAL_STATE = {
  users: [],
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
