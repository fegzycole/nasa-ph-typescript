import CircularJSON from 'circular-json';
import { Dispatch } from 'redux';

import { firestore } from '../../firebase/firebase.util';
import { toggleSpinner, addError, Picture, ActionTypes } from './index';

export interface AddFavoriteAction {
  type: ActionTypes.ADD_FAVORITE,
  payload: Picture[],
}

export const addFavorite = (payload: Picture[]): AddFavoriteAction => ({
  type: ActionTypes.ADD_FAVORITE,
  payload,
});

export const getFavorites = () => async (dispatch: Dispatch) => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '{}');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const userRef = firestore.doc(`users/${user.uid}`);

  const response: Picture[] = [];
  try {
    favorites = await firestore.collection('favorites').where('user', '==', userRef).get();

    favorites.forEach((doc: Picture) => {
      response.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    dispatch(addError(error.message));
  }

  dispatch(addFavorite(response));

  favorites = CircularJSON.stringify(response);

  localStorage.setItem('favorites', favorites);
};

export const loadFavorites = () => async (dispatch: Dispatch) => {
  try {
    dispatch(toggleSpinner());

    await dispatch<any>(getFavorites());
  } catch (error) {
    dispatch(addError(error.message));
  }

  dispatch(toggleSpinner());
};

export const addToFavorite = (picture: Picture) => async (dispatch: Dispatch) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const userRef = firestore.doc(`users/${user.uid}`);
  try {
    await dispatch(toggleSpinner());

    await firestore.collection('favorites').add({
      ...picture,
      user: userRef,
    });

    await dispatch<any>(getFavorites());
  } catch (error) {
    dispatch(addError(error.message));
  }

  dispatch(toggleSpinner());
};

export const removeFromFavorites = ({ id }: Picture ) => async (dispatch: Dispatch) => {
  try {
    dispatch(toggleSpinner());

    await firestore.collection('favorites').doc(id).delete();

    await dispatch<any>(getFavorites());
  } catch (error) {
    dispatch(addError(error.message));
  }

  dispatch(toggleSpinner());
};

export const removeFavorites = () => async (dispatch: Dispatch) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  try {
    await dispatch(toggleSpinner());

    await favorites.forEach(async ({ id }: Picture) => {
      await firestore.collection('favorites').doc(id).delete();
    });
  } catch (error) {
    await dispatch(addError(error.message));
  }

  await dispatch<any>(getFavorites());

  dispatch(toggleSpinner());

  await dispatch(addFavorite([]));

  return undefined;
};