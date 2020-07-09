import ActionTypes from '../actions/types';
import Action from '../actions/action';
import { Picture } from '../actions/pictures';

const date = (state: Picture | null = null, action: Action): Picture | null => {
  switch (action.type) {
    case ActionTypes.ADD_PICTURE:
      return action.payload;

    default:
      return state;
  }
};

export default date;
