import { combineReducers, CombinedState } from 'redux';
import firebase from 'firebase';

import Action from '../actions/action';
import { Picture } from '../actions/pictures';
import date from './date';
import spinner from './spinner';
import picture from './pictures';
import error from './error';
import favorites from './favorites';
import user from './user';

export interface StoreState {
  date: string;
  spinner: boolean;
  picture: Picture | null;
  error: string | null;
  favorites: Picture[];
  user: firebase.User | null;
}

const rootReducer = combineReducers<StoreState>({
  date,
  spinner,
  picture,
  error,
  favorites,
  user,
});

export default (state: CombinedState<StoreState> | undefined, action: Action) => (
  rootReducer(action.type === 'LOGOUT' ? undefined : state, action)
);
