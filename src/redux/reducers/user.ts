import firebase from 'firebase';

import ActionTypes from '../actions/types';
import Action from '../actions/action';

const localUser = localStorage.getItem('user');

const user = localUser ? JSON.parse(localUser || '') : null;

console.log(3333, user);

const userReducer = (state: firebase.User | null = user, action: Action): firebase.User | null => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
