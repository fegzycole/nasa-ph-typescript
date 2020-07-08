import React from 'react';

import favoriteCardStyles from '../styles/favoritecard.module.scss';
import { MouseEvent, KeyboardEvent } from '../types';

interface CardProps {
  imageUrl: string;
  title: string;
  handleClick: MouseEvent;
  handleKeyPress: KeyboardEvent;
}

const FavoriteCard = ({
  imageUrl,
  title,
  handleKeyPress,
  handleClick,
}: CardProps): JSX.Element => (
  <div
    onClick={handleClick}
    onKeyPress={handleKeyPress}
    role="button"
    tabIndex={0}
    className={favoriteCardStyles.favorite}
  >
    <img src={imageUrl} alt="" className={favoriteCardStyles.favoriteImg} />
    <h6 className={favoriteCardStyles.favoriteTitle}>{title}</h6>
  </div>
);

export default FavoriteCard;
