import { Action, ActionTypes, User } from '../actions';

const user: User = JSON.parse(localStorage.getItem('user') || '{}');

const userReducer = (state: User = user || {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
