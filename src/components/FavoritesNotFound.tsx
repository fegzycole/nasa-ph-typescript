import React from 'react';

import Button from './Button';
import favoriteNotFoundStyles from '../styles/favnotfound.module.scss';
import { ButtonEvent } from '../types';

interface FourZeroFour {
  handleClick: ButtonEvent;
  text: string;
}

const FavoritesNotFound = ({ handleClick, text }: FourZeroFour): JSX.Element => (
  <div className={favoriteNotFoundStyles.favNotFound}>
    <p
      className={favoriteNotFoundStyles.text}
    >
      {text}
    </p>
    <Button
      text="Return Home"
      color="#a27bd3"
      handleClick={handleClick}
    />
  </div>
);

export default FavoritesNotFound;
