import { combineReducers } from 'redux';
import firebase from 'firebase';

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

export default combineReducers<StoreState>({
  date,
  spinner,
  picture,
  error,
  favorites,
  user,
});
