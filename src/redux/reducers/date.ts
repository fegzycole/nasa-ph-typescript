import ActionTypes from '../actions/types';
import Action from '../actions/action';
import { getTodayDate } from '../../helpers';

const date = (state: string = getTodayDate(), action: Action): string => {
  switch (action.type) {
    case ActionTypes.ADD_DATE:
      return action.payload;

    default:
      return state;
  }
};

export default date;
