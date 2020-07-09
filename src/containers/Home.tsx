import React, { useEffect, FC, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import Arrow from '../components/Arrow';
import Spinner from '../components/Spinner';
import Info from '../components/Info';
import homeStyles from '../styles/home.module.scss';
import { getPicture, Picture, updateDate, User } from '../redux/actions';
import { StoreState } from '../redux/reducers';
import {
  addToFavorite,
  removeFromFavorites,
  loadFavorites,
} from '../redux/actions/favorites';
import { getPrevDate, getNextDate, getNormalizedDate } from '../helpers/index';

interface HomeProps extends RouteComponentProps<any> {
  spinner: boolean;
  getPicture: Function;
  date: string;
  picture: Picture;
  updateDate: Function;
  error: string | null;
  favorites: Picture[];
  addToFavorite: Function;
  removeFromFavorites: Function;
  user: User;
  loadFavorites: Function;
}

const Home: FC<HomeProps> = ({
  spinner,
  getPicture,
  date,
  picture,
  updateDate,
  error,
  favorites,
  addToFavorite,
  removeFromFavorites,
  history,
  user,
  loadFavorites,
}) => {
  const getCurrPicture = useCallback((picDate = date) => {
    getPicture(picDate);
  }, [date, getPicture]);

  const initialize = () => {
    if (!user.email) {
      return history.push('/signin');
    }

    loadFavorites();
    getCurrPicture();
    return undefined;
  };

  const handlePrevClick = () => {
    const newDate = getPrevDate(date);
    updateDate(newDate);
    getCurrPicture(newDate);
  };

  const handleNextClick = () => {
    const newDate = getNextDate(date);
    updateDate(newDate);
    getCurrPicture(newDate);
  };

  const getSelectedDate = (date: string) => {
    const selectedDate = getNormalizedDate(date);
    updateDate(selectedDate);
    getCurrPicture(selectedDate);
  };


  useEffect(initialize, []);

  const isFavorite = favorites.find((pic) => pic.date === picture.date);

  return (
    <div className={homeStyles.home}>
      <Arrow
        innerClassName="fas fa-chevron-left"
        outerClassName="left"
        handleClick={handlePrevClick}
        handleKeyPress={handlePrevClick}
      />
      <Arrow
        innerClassName="fas fa-chevron-right"
        outerClassName="right"
        handleClick={handleNextClick}
        handleKeyPress={handleNextClick}
      />
      <div>
        {console.log(spinner)}
        { spinner ? <Spinner /> : (
          <div className={homeStyles.infoContainer}>
            {
              error ? <p className={homeStyles.error}>{error}</p> : (
                (
                  <Info
                    title={picture.title}
                    description={picture.explanation}
                    imageUrl={picture.url}
                    btnClolor={isFavorite ? 'red' : '#b480f3'}
                    text={isFavorite ? 'Remove Favorite' : 'Set Favorite'}

                    handleClick={() => (isFavorite
                      ? removeFromFavorites(isFavorite)
                      : addToFavorite(picture))}

                    handleSelect={(e: string) => getSelectedDate(e)}
                    dateValue={date}
                    showDate
                  />
                )
              )
            }
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  spinner,
  picture,
  date,
  error,
  favorites,
  user,
}: StoreState) => ({
  spinner,
  date,
  picture,
  error,
  favorites,
  user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getPicture: (date: string) => dispatch(getPicture(date)),
  updateDate: (date: string) => dispatch(updateDate(date)),
  addToFavorite: (picture: Picture) => dispatch(addToFavorite(picture)),
  removeFromFavorites: (picture: Picture) =>
    dispatch(removeFromFavorites(picture)),
  loadFavorites: () => dispatch(loadFavorites()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
