import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Info from '../components/Info';
import { Picture } from '../redux/actions';
import { StoreState } from '../redux/reducers';
import FavoriteNotFound from '../components/FavoritesNotFound';
import favoriteStyles from '../styles/favorites.module.scss';
import { removeFromFavorites } from '../redux/actions';

interface FavoriteProps extends RouteComponentProps<any> {
  favorites: Picture[];
  removeFromFavorites: Function;
}

const Favorite: FC<FavoriteProps> = ({
  match, favorites, removeFromFavorites, history,
}) => {
  const {
    params: { date },
  } = match;

  const picture = favorites.find((pic: Picture) => pic.date === date);

  const deleteFromFavorites = async (): Promise<void> => {
    await removeFromFavorites(picture);
    history.push('/favorites');
  };

  const redirectHome = (): void => {
    history.push('/');
  };

  return (
    <div className={favoriteStyles.favoritesContainer}>
      {
        picture ? (
          <Info
            title={picture.title}
            description={picture.explanation}
            imageUrl={picture.url}
            btnClolor="red"
            text="Remove Favorite"
            handleClick={deleteFromFavorites}
          />
        ) : (
          <FavoriteNotFound
            text="No favorite with the specified date exists"
            handleClick={redirectHome}
          />
        )
      }
    </div>
  );
};

const mapStateToProps = ({ favorites }: StoreState) => ({
  favorites,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  removeFromFavorites: (picture: Picture) => dispatch(removeFromFavorites(picture)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorite));
