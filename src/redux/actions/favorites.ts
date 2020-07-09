import CircularJSON from 'circular-json';
import { ThunkDispatch } from 'redux-thunk';

import { firestore } from '../../firebase/firebase.util';
import { toggleSpinner } from './spinner';
import { addError } from './error';
import ActionTypes from './types';
import { Picture } from './pictures';

export interface AddFavoriteAction {
  type: ActionTypes.ADD_FAVORITE;
  payload: Picture[];
}

export const addFavorite = (payload: Picture[]): AddFavoriteAction => ({
  type: ActionTypes.ADD_FAVORITE,
  payload,
});

export const getFavorites = () => async (dispatch: ThunkDispatch<{}, {}, any>) => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[{}]');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userReference = firestore.doc(`users/${user.uid}`);
  const response: Picture[] = [];
  try {
    favorites = await firestore.collection('favorites').where('user', '==', userReference).get();
    favorites.forEach((document_: Picture) => {
      response.push({ ...document_.data(), id: document_.id });
    });
  } catch (error) {
    dispatch(addError(error.message));
  }
  dispatch(addFavorite(response));
  favorites = CircularJSON.stringify(response);
  localStorage.setItem('favorites', favorites);
};

export const loadFavorites = () => async (dispatch: ThunkDispatch<{}, {}, any>) => {
  try {
    dispatch(toggleSpinner());
    dispatch(getFavorites());
  } catch (error) {
    dispatch(addError(error.message));
  }

  dispatch(toggleSpinner());
};

export const addToFavorite = (picture: Picture) => async (dispatch: ThunkDispatch<{}, {}, any>) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userReference = firestore.doc(`users/${user.uid}`);
  try {
    dispatch(toggleSpinner());

    await firestore.collection('favorites').add({
      ...picture,
      user: userReference,
    });
    dispatch(getFavorites());
  } catch (error) {
    dispatch(addError(error.message));
  }
  dispatch(toggleSpinner());
};

export const removeFromFavorites = ({ id }: Picture) => async (dispatch: ThunkDispatch<{}, {}, any>) => {
  try {
    dispatch(toggleSpinner());
    await firestore.collection('favorites').doc(id).delete();
    await dispatch(getFavorites());
  } catch (error) {
    dispatch(addError(error.message));
  }
  dispatch(toggleSpinner());
};

export const removeFavorites = () => async (dispatch: ThunkDispatch<{}, {}, any>) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  try {
    dispatch(toggleSpinner());
    await favorites.forEach(async ({ id }: Picture) => {
      await firestore.collection('favorites').doc(id).delete();
    });
  } catch (error) {
    dispatch(addError(error.message));
  }
  await dispatch(getFavorites());
  dispatch(toggleSpinner());
  dispatch(addFavorite([]));
  return undefined;
};
