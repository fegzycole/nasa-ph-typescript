import { ActionTypes, Action } from '../actions';
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