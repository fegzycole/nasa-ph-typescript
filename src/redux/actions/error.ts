import { ActionTypes } from './index';

export interface AddErrorAction {
  type: ActionTypes.ADD_ERROR,
  payload: string | null,
}

export const addError = (payload: string | null): AddErrorAction => ({
  type: ActionTypes.ADD_ERROR,
  payload,
});