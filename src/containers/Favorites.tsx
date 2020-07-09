import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import FavoriteCard from '../components/FavoriteCard';
import favoritesStyles from '../styles/favorites.module.scss';
import Button from '../components/Button';
import {
  removeFavorites,
  loadFavorites,
  Picture,
  User,
} from '../redux/actions';
import { StoreState } from '../redux/reducers';
import FavoritesNotFound from '../components/FavoritesNotFound';
import Spinner from '../components/Spinner';

interface FavoritesProp extends RouteComponentProps<any> {
  favorites: Picture[];
  removeFavorites: Function;
  spinner: boolean;
  user: User;
  loadFavorites: Function;
}

const Favorites: FC<FavoritesProp> = ({
  favorites,
  history,
  removeFavorites,
  spinner,
  user,
  loadFavorites,
}) => {
  const showFavorite = (date: string) => history.push(`/favorite/${date}`);

  const redirectHome = () => {
    history.push('/');
  };

  const removeAllFavorites = () => {
    removeFavorites();
  };

  const initialize = () => {
    if (!user.email) {
      history.push('/signin');
    }

    loadFavorites();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initialize, []);

  return (
    <div className={favoritesStyles.favoritesContainer}>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {favorites.length > 0 ? (
            <div>
              <div className={favoritesStyles.group}>
                <h3 className={favoritesStyles.groupHeader}>My Favorites</h3>
                <Button
                  text='Clear All'
                  color='red'
                  handleClick={removeAllFavorites}
                />
              </div>
              <div className={favoritesStyles.favorites}>
                {favorites.map((pic) => (
                  <FavoriteCard
                    key={`${Math.random()}-${Math.random()}`}
                    title={pic.title}
                    imageUrl={pic.url}
                    handleClick={() => showFavorite(pic.date)}
                    handleKeyPress={() => showFavorite(pic.date)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <FavoritesNotFound
              handleClick={redirectHome}
              text='You have no favorites yet'
            />
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ favorites, spinner, user }: StoreState) => ({
  favorites,
  spinner,
  user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  removeFavorites: () => dispatch(removeFavorites()),
  loadFavorites: () => dispatch(loadFavorites()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Favorites),
);
