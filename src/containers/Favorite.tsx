import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Info from '../components/Info';
import { Picture } from '../redux/actions/pictures';
import { removeFromFavorites } from '../redux/actions/favorites';
import { StoreState } from '../redux/reducers';
import FavoriteNotFound from '../components/FavoritesNotFound';
import favoriteStyles from '../styles/favorites.module.scss';
import Spinner from '../components/Spinner';

interface FavoriteProps extends RouteComponentProps<any> {
  favorites: Picture[];
  removeFromFavorites: Function;
  spinner: boolean;
}

const Favorite: FC<FavoriteProps> = ({
  match,
  favorites,
  history,
  removeFromFavorites,
  spinner,
}) => {
  const { params: { date } } = match;

  const picture = favorites.find((pic: Picture) => pic.date === date);

  const deleteFromFavorites = async (): Promise<void> => {
    if (picture) {
      await removeFromFavorites(picture);
    }
    history.push('/favorites');
  };

  const redirectHome = (): void => {
    history.push('/');
  };

  return (
    <div className={favoriteStyles.favoritesContainer}>
      {
        spinner && <Spinner addOverlay />
      }
      {picture ? (
        <Info
          title={picture.title}
          description={picture.explanation}
          imageUrl={picture.url}
          btnClolor='red'
          text='Remove Favorite'
          handleClick={deleteFromFavorites}
        />
      ) : (
        <FavoriteNotFound
          text='No favorite with the specified date exists'
          handleClick={redirectHome}
        />
      )}
    </div>
  );
};

const mapStateToProperties = ({ favorites, spinner }: StoreState) => ({ favorites, spinner });

const mapDispatchToProperties = (dispatch: ThunkDispatch<{}, {}, any>) => (
  { removeFromFavorites: (picture: Picture) => dispatch(removeFromFavorites(picture)) }
);

export default withRouter(
  connect(mapStateToProperties, mapDispatchToProperties)(Favorite),
);
