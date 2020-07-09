import ActionTypes from './types';

export interface AddDateAction {
  type: ActionTypes.ADD_DATE;
  payload: string;
}

export const updateDate = (payload: string): AddDateAction => ({
  type: ActionTypes.ADD_DATE,
  payload,
});
