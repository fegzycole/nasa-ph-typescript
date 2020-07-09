import ActionTypes from '../actions/types';
import Action from '../actions/action';

const spinner = (state = false, action: Action): boolean => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SPINNER:
      return !state;

    default:
      return state;
  }
};

export default spinner;
