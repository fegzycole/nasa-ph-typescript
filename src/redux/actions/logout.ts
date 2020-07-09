import { ActionTypes } from './index';

export interface AddLogoutAction {
  type: ActionTypes.LOGOUT
};

export const logoutUser = (): AddLogoutAction => ({
  type: ActionTypes.LOGOUT,
});
