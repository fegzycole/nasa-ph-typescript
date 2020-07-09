import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import FavoriteCard from '../components/FavoriteCard';
import favoritesStyles from '../styles/favorites.module.scss';
import { ButtonEvent } from '../types';
import Button from '../components/Button';
import { removeFavorites, loadFavorites } from '../redux/actions/favorites';
import { Picture } from '../redux/actions/pictures';
import { StoreState } from '../redux/reducers';
import FavoritesNotFound from '../components/FavoritesNotFound';
import Spinner from '../components/Spinner';

interface FavoritesProp extends RouteComponentProps<any> {
  favorites: Picture[];
  removeFavorites: ButtonEvent;
  spinner: boolean;
  user: firebase.User | null;
  loadFavorites: Function;
}

const Favorites: FC<FavoritesProp> = ({
  favorites,
  history,
  spinner,
  user,
  removeFavorites,
  loadFavorites,
}) => {
  const showFavorite = (date: string) => history.push(`/favorite/${date}`);

  const redirectHome = () => {
    history.push('/');
  };

  const initialize = () => {
    if (!user) {
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
                  handleClick={removeFavorites}
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

const mapStateToProperties = ({ favorites, spinner, user }: StoreState) => ({
  favorites,
  spinner,
  user,
});

const mapDispatchToProperties = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  removeFavorites: () => dispatch(removeFavorites()),
  loadFavorites: () => dispatch(loadFavorites()),
});

export default withRouter(
  connect(mapStateToProperties, mapDispatchToProperties)(Favorites),
);
