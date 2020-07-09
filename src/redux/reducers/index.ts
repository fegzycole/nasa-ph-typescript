import { combineReducers, CombinedState } from 'redux';

import { Picture, User, Action } from '../actions';
import date from './date';
import spinner from './spinner';
import picture from './pictures';
import error from './error';
import favorites from './favorites';
import user from './user';

export interface StoreState {
  date: string;
  spinner: boolean;
  picture: Picture;
  error: string | null;
  favorites: Picture[];
  user: User;
}

const rootReducer = combineReducers<StoreState>({
  date,
  spinner,
  picture,
  error,
  favorites,
  user,
});

export default (state: CombinedState<StoreState> | undefined, action: Action) =>
  rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
