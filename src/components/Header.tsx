import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';

import headerStyles from '../styles/header.module.scss';
import { addUser } from '../redux/actions/user';
import { logoutUser } from '../redux/actions/logout';
import { Picture } from '../redux/actions/pictures';
import { addFavorite } from '../redux/actions/favorites';
import { StoreState } from '../redux/reducers';
import { auth } from '../firebase/firebase.util';

interface HeaderProps extends RouteComponentProps<any> {
  user: firebase.User | null;
  favorites: Picture[];
  addUser: Function;
  logoutUser: Function;
  addFavorite: Function;
}

const Header: FC<HeaderProps> = ({
  user,
  history,
  favorites,
  addUser,
  logoutUser,
  addFavorite,
}) => {
  const logout = async (): Promise<void> => {
    await auth.signOut();

    localStorage.removeItem('user');

    localStorage.removeItem('favorites');

    addUser(null);

    logoutUser();

    addFavorite([]);

    history.push('/signin');
  };

  return (
    <header className={headerStyles.header}>
      <ul
        className={`${headerStyles.headerLinks} ${user ? 'expandHeader' : ''}`}
      >
        {console.log(1111, user)}
        {user ? (
          <>
            {favorites.length > 0 ? (
              <>
                <li className={headerStyles.headerList}>
                  <NavLink to='/' className={headerStyles.headerLink}>
                    Home
                  </NavLink>
                </li>
                <li className={headerStyles.headerList}>
                  <NavLink to='/favorites' className={headerStyles.headerLink}>
                    Favorites
                  </NavLink>
                </li>
              </>
            ) : null}
            <li className={headerStyles.headerList}>
              <div
                className={headerStyles.headerLink}
                onClick={logout}
                onKeyPress={logout}
                tabIndex={0}
                role='button'
              >
                Logout
              </div>
            </li>
          </>
        ) : (
          <>
            <li className={headerStyles.headerList}>
              <NavLink to='/signup' className={headerStyles.headerLink}>
                Signup
              </NavLink>
            </li>
            <li className={headerStyles.headerList}>
              <NavLink to='/signin' className={headerStyles.headerLink}>
                Signin
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

const mapStateToProperties = ({ user, favorites }: StoreState) => ({
  user,
  favorites,
});

const mapDispatchToProperties = (dispatch: Dispatch) => ({
  addUser: (user: firebase.User | null) => dispatch(addUser(user)),
  logoutUser: () => dispatch(logoutUser()),
  addFavorite: (favorites: Picture[]) => dispatch(addFavorite(favorites)),
});

export default withRouter(
  connect(mapStateToProperties, mapDispatchToProperties)(Header),
);
