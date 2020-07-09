import { ActionTypes } from './index';

export interface User {
  email: string,
  uid: string,
}

export interface AddUserAction {
  type: ActionTypes.SET_USER,
  payload: User,
}

export const addUser = (payload: User): AddUserAction => ({
  type: ActionTypes.SET_USER,
  payload,
});