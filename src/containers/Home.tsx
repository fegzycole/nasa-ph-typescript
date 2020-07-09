import React, { useEffect, FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import Arrow from '../components/Arrow';
import Spinner from '../components/Spinner';
import Info from '../components/Info';
import homeStyles from '../styles/home.module.scss';
import { getPicture, Picture } from '../redux/actions/pictures';
import { updateDate } from '../redux/actions/date';
import { StoreState } from '../redux/reducers';
import { addToFavorite, removeFromFavorites, loadFavorites } from '../redux/actions/favorites';
import { getPrevDate as getPreviousDate, getNextDate, getNormalizedDate } from '../helpers';

interface HomeProps extends RouteComponentProps<any> {
  spinner: boolean;
  getPicture: Function;
  date: string;
  picture: Picture | null;
  updateDate: Function;
  error: string | null;
  favorites: Picture[];
  addToFavorite: Function;
  removeFromFavorites: Function;
  user: firebase.User | null;
  loadFavorites: Function;
}

const Home: FC<HomeProps> = ({
  spinner,
  date,
  picture,
  error,
  favorites,
  history,
  user,
  getPicture,
  updateDate,
  addToFavorite,
  removeFromFavorites,
  loadFavorites,
}) => {
  const getCurrentPicture = (picDate = date) => {
    getPicture(picDate);
  };

  const initialize = () => {
    if (!user) {
      return history.push('/signin');
    }

    loadFavorites();
    getCurrentPicture();
    return undefined;
  };

  const handlePreviousClick = () => {
    const newDate = getPreviousDate(date);
    updateDate(newDate);
    getCurrentPicture(newDate);
  };

  const handleNextClick = () => {
    const newDate = getNextDate(date);
    updateDate(newDate);
    getCurrentPicture(newDate);
  };

  const getSelectedDate = (day: string) => {
    const selectedDate = getNormalizedDate(day);
    updateDate(selectedDate);
    getCurrentPicture(selectedDate);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initialize, []);

  const isFavorite = picture && favorites.find((pic) => pic.date === picture.date);

  return (
    <div className={homeStyles.home}>
      <Arrow
        innerClassName='fas fa-chevron-left'
        outerClassName='left'
        handleClick={handlePreviousClick}
        handleKeyPress={handlePreviousClick}
      />
      <Arrow
        innerClassName='fas fa-chevron-right'
        outerClassName='right'
        handleClick={handleNextClick}
        handleKeyPress={handleNextClick}
      />
      <div>
        {spinner ? (
          <Spinner />
        ) : (
          <div className={homeStyles.infoContainer}>
            {error ? (
              <p className={homeStyles.error}>{error}</p>
            ) : (picture
              && (
              <Info
                title={picture.title}
                description={picture.explanation}
                imageUrl={picture.url}
                btnClolor={isFavorite ? 'red' : '#b480f3'}
                text={isFavorite ? 'Remove Favorite' : 'Set Favorite'}
                handleClick={() => (isFavorite ? removeFromFavorites(isFavorite) : addToFavorite(picture))}
                handleSelect={(event: string) => getSelectedDate(event)}
                dateValue={date}
                showDate
              />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProperties = ({ spinner, picture, date, error, favorites, user }: StoreState) => ({
  spinner,
  date,
  picture,
  error,
  favorites,
  user,
});

const mapDispatchToProperties = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getPicture: (date: string) => dispatch(getPicture(date)),
  updateDate: (date: string) => dispatch(updateDate(date)),
  addToFavorite: (picture: Picture) => dispatch(addToFavorite(picture)),
  removeFromFavorites: (picture: Picture) => dispatch(removeFromFavorites(picture)),
  loadFavorites: () => dispatch(loadFavorites()),
});

export default withRouter(connect(mapStateToProperties, mapDispatchToProperties)(Home));
