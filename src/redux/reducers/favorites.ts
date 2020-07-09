import { Action, ActionTypes, Picture } from '../actions/index';

const myFavorites: Picture[] = JSON.parse(localStorage.getItem('favorites') || '{}');

const favorites = (state: Picture[] = myFavorites || [], action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      return action.payload;

    default:
      return state;
  }
};

export default favorites;
