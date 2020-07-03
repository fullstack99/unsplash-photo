import * as types from './types';

export const setUsers = (data) => ({
  type: types.SET_USERS,
  payload: data,
});
