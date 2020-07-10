import axios from 'axios';
import { Dispatch } from 'redux';

import ActionTypes from './types';
import { toggleSpinner } from './spinner';
import { addError } from './error';

const { REACT_APP_API_KEY } = process.env;

export interface Picture {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  id: string;
  data: Function;
}

export interface AddPictureAction {
  type: ActionTypes.ADD_PICTURE;
  payload: Picture;
}

export const addPicture = (payload: Picture): AddPictureAction => ({
  type: ActionTypes.ADD_PICTURE,
  payload,
});

export const getPicture = (date: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(addError(null));

    dispatch(toggleSpinner());

    const URL = `https://api.nasa.gov/planetary/apod?api_key=${REACT_APP_API_KEY}&date=${date}`;

    const { data } = await axios.get<Picture>(URL);

    dispatch(addPicture(data));

    dispatch(toggleSpinner());
  } catch (error) {
    const { response, message } = error;

    if (!response) {
      dispatch(addError(message));
    } else {
      const { data: { msg } } = response;
      dispatch(addError(msg));
    }
    dispatch(toggleSpinner());
  }
};
