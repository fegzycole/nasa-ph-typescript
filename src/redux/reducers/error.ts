import { Action, ActionTypes } from '../actions';

const spinner = (state: string | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_ERROR:
      return action.payload;

    default:
      return state;
  }
};

export default spinner;