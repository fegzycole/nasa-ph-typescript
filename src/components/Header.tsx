import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import headerStyles from '../styles/header.module.scss';
import { addUser, logoutUser, User, Picture } from '../redux/actions';
import { StoreState } from '../redux/reducers';
import { auth } from '../firebase/firebase.util';

interface HeaderProps extends RouteComponentProps<any> {
  user: User;
  favorites: Picture[];
  addUser: Function;
  logoutUser: Function;
}

const Header: FC<HeaderProps> = ({
  user, history, favorites, addUser, logoutUser,
}) => {
  const logout = async (): Promise<void> => {
    await auth.signOut();

    localStorage.removeItem('user');

    localStorage.removeItem('favorites');

    addUser({});

    logoutUser();

    history.push('/signin');
  };

  return (
    <header className={headerStyles.header}>
      <ul className={`${headerStyles.headerLinks} ${user ? 'expandHeader' : ''}`}>
        {
          user && user.email ? (
            <>
              {
              favorites.length > 0 ? (
                <>
                  <li className={headerStyles.headerList}>
                    <NavLink to="/" className={headerStyles.headerLink}>
                      Home
                    </NavLink>
                  </li>
                  <li className={headerStyles.headerList}>
                    <NavLink to="/favorites" className={headerStyles.headerLink}>
                      Favorites
                    </NavLink>
                  </li>
                </>
              ) : null
            }
              <li className={headerStyles.headerList}>
                <div
                  className={headerStyles.headerLink}
                  onClick={logout}
                  onKeyPress={logout}
                  tabIndex={0}
                  role="button"
                >
                  Logout
                </div>
              </li>
            </>
          ) : (
            <>
              <li className={headerStyles.headerList}>
                <NavLink to="/signup" className={headerStyles.headerLink}>
                  Signup
                </NavLink>
              </li>
              <li className={headerStyles.headerList}>
                <NavLink to="/signin" className={headerStyles.headerLink}>
                  Signin
                </NavLink>
              </li>
            </>
          )
        }
      </ul>
    </header>
  );
};


const mapStateToProps = ({ user, favorites }: StoreState) => ({
  user,
  favorites,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addUser: (user: User) => dispatch(addUser(user)),
  logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));