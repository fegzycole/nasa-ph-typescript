import {
  AddUserAction,
  AddDateAction,
  AddLogoutAction,
  AddErrorAction,
  AddFavoriteAction,
  AddSpinnerAction,
  AddPictureAction
} from './index';

export enum ActionTypes {
  ADD_DATE = 'ADD_DATE',
  TOGGLE_SPINNER = 'TOGGLE_SPINNER',
  ADD_PICTURE = 'ADD_PICTURE',
  ADD_ERROR = 'ADD_ERROR',
  SET_CURR_PICTURE = 'SET_CURR_PICTURE',
  ADD_FAVORITE = 'ADD_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
  CLEAR_FAVORITES = 'CLEAR_FAVORITES',
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
}

export type Action =
  | AddUserAction
  | AddDateAction
  | AddLogoutAction
  | AddErrorAction
  | AddFavoriteAction
  | AddSpinnerAction
  | AddPictureAction;
