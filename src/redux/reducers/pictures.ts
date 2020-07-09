import { ActionTypes, Action, Picture } from '../actions';

const date = (state: Picture = {} as Picture, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_PICTURE:
      return action.payload;

    default:
      return state;
  }
};

export default date;
