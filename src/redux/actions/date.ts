import { ActionTypes } from './index';

export interface AddDateAction {
  type: ActionTypes.ADD_DATE,
  payload: string,
};

export default (payload: string): AddDateAction => ({
  type: ActionTypes.ADD_DATE,
  payload,
});