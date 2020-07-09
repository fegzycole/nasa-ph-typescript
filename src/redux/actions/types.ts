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
  ADD_DATE,
  TOGGLE_SPINNER,
  ADD_PICTURE,
  ADD_ERROR,
  SET_CURR_PICTURE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_FAVORITES,
  SET_USER,
  LOGOUT,
}

export type Action =
  | AddUserAction
  | AddDateAction
  | AddLogoutAction
  | AddErrorAction
  | AddFavoriteAction
  | AddSpinnerAction
  | AddPictureAction;
