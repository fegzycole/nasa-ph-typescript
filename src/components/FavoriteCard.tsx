import React from 'react';

import favoriteCardStyles from '../styles/favoritecard.module.scss';

interface CardProps {
  imageUrl: string;
  title: string;
  handleClick: Function;
}

const FavoriteCard = ({ imageUrl, title, handleClick }: CardProps): JSX.Element => (
  <div
    onClick={() => handleClick()}
    onKeyPress={() => handleClick()}
    role="button"
    tabIndex={0}
    className={favoriteCardStyles.favorite}
  >
    <img
      src={imageUrl}
      alt=""
      className={favoriteCardStyles.favoriteImg}
    />
    <h6
      className={favoriteCardStyles.favoriteTitle}
    >
      {title}
    </h6>
  </div>
);

export default FavoriteCard;
