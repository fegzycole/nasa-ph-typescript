import ActionTypes from './types';

export interface AddSpinnerAction {
  type: ActionTypes.TOGGLE_SPINNER;
}

export const toggleSpinner = (): AddSpinnerAction => ({ type: ActionTypes.TOGGLE_SPINNER });
