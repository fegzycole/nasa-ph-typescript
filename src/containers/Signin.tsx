import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Form from '../components/Form';
import { toggleSpinner } from '../redux/actions/spinner';
import { addUser } from '../redux/actions/user';
import { StoreState } from '../redux/reducers';
import Spinner from '../components/Spinner';
import { auth } from '../firebase/firebase.util';

interface SignInProps extends RouteComponentProps<any> {
  spinner: boolean;
  toggleSpinner: Function;
  addUser: Function;
}

const SignIn: FC<SignInProps> = ({ spinner, history, toggleSpinner, addUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setError(null);
    try {
      toggleSpinner();

      const { user } = await auth.signInWithEmailAndPassword(email, password);

      const newUser = JSON.stringify(user);

      localStorage.setItem('user', newUser);

      addUser(user);

      toggleSpinner();

      return history.push('/');
    } catch (error_) {
      toggleSpinner();
      setError(error_.message);
      return undefined;
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
        handleEmailChange={(event) => setEmail(event.target.value)}
        handlePasswordChange={(event) => setPassword(event.target.value)}
        headerText='Sign In'
        handleSubmit={signin}
        submitBtnText='Login'
        error={error}
      />
    </div>
  );
};

const mapStateToProperties = ({ spinner }: StoreState) => ({ spinner });

const mapDispatchToProperties = (dispatch: Dispatch) => ({
  toggleSpinner: () => dispatch(toggleSpinner()),
  addUser: (user: firebase.User | null) => dispatch(addUser(user)),
});

export default withRouter(connect(mapStateToProperties, mapDispatchToProperties)(SignIn));
