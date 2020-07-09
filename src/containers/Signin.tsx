import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Form from '../components/Form';
import { toggleSpinner, addUser, User } from '../redux/actions';
import { StoreState } from '../redux/reducers';
import Spinner from '../components/Spinner';
import { auth } from '../firebase/firebase.util';

interface SignInProps extends RouteComponentProps<any> {
  spinner: boolean;
  toggleSpinner: Function;
  addUser: Function;
}

const SignIn: FC<SignInProps> = ({
  spinner, toggleSpinner, history, addUser,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    try {
      toggleSpinner();

      const { user } = await auth.signInWithEmailAndPassword(email, password);

      const newUser = JSON.stringify(user);

      localStorage.setItem('user', newUser);

      addUser(user);

      toggleSpinner();

      return history.push('/');
    } catch (error) {
      toggleSpinner();
      setError(error.message);
    }
  };

  return (
    <div>
      {
        spinner && <Spinner addOverlay />
      }
      <Form
        email={email}
        password={password}
        handleEmailChange={e => setEmail(e.target.value)}
        handlePasswordChange={e => setPassword(e.target.value)}
        headerText="Sign In"
        handleSubmit={signin}
        submitBtnText="Login"
        error={error}
      />
    </div>
  );
};

const mapStateToProps = ({ spinner }: StoreState) => ({
  spinner,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleSpinner: () => dispatch(toggleSpinner()),
  addUser: (user: User) => dispatch(addUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
