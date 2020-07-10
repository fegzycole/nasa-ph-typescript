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

interface SignupProps extends RouteComponentProps<any> {
  spinner: boolean;
  toggleSpinner: Function;
  addUser: Function;
}

const Signup: FC<SignupProps> = ({ spinner, history, toggleSpinner, addUser }): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const signup = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setError(null);

    if (password !== passwordConfirmation) {
      setError('Passwords must match!!');
      return undefined;
    }

    try {
      toggleSpinner();
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

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
        headerText='Sign Up'
        showExtraPassword
        confirmPassword={passwordConfirmation}
        handlePasswordConfirmationChange={(event) => setPasswordConfirmation(event.target.value)}
        handleSubmit={signup}
        submitBtnText='Register'
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

export default withRouter(connect(mapStateToProperties, mapDispatchToProperties)(Signup));
