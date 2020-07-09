import { ActionTypes, Action } from '../actions';

const spinner = (state: boolean = false, action: Action ): boolean => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SPINNER:
      return !state;

    default:
      return state;
  }
};

export default spinner;
