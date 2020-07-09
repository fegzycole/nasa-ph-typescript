import firebase from 'firebase';

import ActionTypes from './types';

export interface AddUserAction {
  type: ActionTypes.SET_USER;
  payload: firebase.User | null;
}

export const addUser = (payload: firebase.User | null): AddUserAction => ({
  type: ActionTypes.SET_USER,
  payload,
});
