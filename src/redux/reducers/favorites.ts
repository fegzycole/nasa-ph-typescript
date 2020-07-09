import ActionTypes from '../actions/types';
import Action from '../actions/action';
import { Picture } from '../actions/pictures';

const myFavorites: Picture[] = JSON.parse(localStorage.getItem('favorites') || '[]');

const favorites = (state: Picture[] = myFavorites || [], action: Action): Picture[] => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      return action.payload;

    default:
      return state;
  }
};

export default favorites;
