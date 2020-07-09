import { AddUserAction } from './user';
import { AddLogoutAction } from './logout';
import { AddErrorAction } from './error';
import { AddDateAction } from './date';
import { AddFavoriteAction } from './favorites';
import { AddSpinnerAction } from './spinner';
import { AddPictureAction } from './pictures';

type Action =
  | AddUserAction
  | AddDateAction
  | AddLogoutAction
  | AddErrorAction
  | AddFavoriteAction
  | AddSpinnerAction
  | AddPictureAction;

export default Action;
