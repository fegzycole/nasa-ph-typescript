import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Form from '../components/Form';
import { toggleSpinner, addUser, User } from '../redux/actions';
import { StoreState } from '../redux/reducers';
import Spinner from '../components/Spinner';
import { auth } from '../firebase/firebase.util';

interface SignupProps extends RouteComponentProps<any> {
  spinner: boolean;
  toggleSpinner: Function;
  addUser: Function;
}

const Signup: FC<SignupProps> = ({
  spinner, toggleSpinner, history, addUser,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (password !== passwordConfirmation) {
      setError('Passwords must match!!');
    } else {
      try {
        toggleSpinner();
        const { user } = await auth.createUserWithEmailAndPassword(email, password);

        const newUser = JSON.stringify(user);

        localStorage.setItem('user', newUser);

        addUser(user);
        toggleSpinner();

        history.push('/');
      } catch (error) {
        toggleSpinner();
        setError(error.message);
      }
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
        headerText="Sign Up"
        showExtraPassword
        confirmPassword={passwordConfirmation}
        handlePasswordConfirmationChange={e => setPasswordConfirmation(e.target.value)}
        handleSubmit={signup}
        submitBtnText="Register"
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
  setUserStatus: (user: User) => dispatch(addUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
