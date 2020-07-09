import React, { FC } from 'react';

import FormInput from './FormInput';
import NasaLogo from '../images/nasa.png';
import formStyles from '../styles/form.module.scss';
import { InputEvent, FormEvent } from '../types';

interface FormProps {
  email: string;
  password: string;
  handleEmailChange: InputEvent;
  handlePasswordChange: InputEvent;
  handleSubmit: FormEvent;
  submitBtnText: string;
  headerText: string;
  showExtraPassword?: boolean;
  confirmPassword?: string;
  handlePasswordConfirmationChange?: InputEvent;
  error: string | null;
}

const Form: FC<FormProps> = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  submitBtnText,
  headerText,
  showExtraPassword,
  confirmPassword,
  handlePasswordConfirmationChange,
  error,
}): JSX.Element => (
  <>
    <div className={formStyles.formContainer}>
      <img src={NasaLogo} alt="" className={formStyles.logo} />
      <form
        onSubmit={handleSubmit}
        className={formStyles.form}
        data-testid="form"
      >
        <h1 className={formStyles.header}>{headerText}</h1>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleEmailChange}
          labelText="Email"
          placeholderText="Enter Email"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handlePasswordChange}
          labelText="Password"
          placeholderText="Enter Password"
        />
        {showExtraPassword && (
          <FormInput
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            handleChange={handlePasswordConfirmationChange}
            labelText="Confirm Password"
            placeholderText="Enter Password Confirmation"
          />
        )}

        <input type="submit" value={submitBtnText} className={formStyles.btn} />

        <p className={formStyles.error}>{error}</p>
      </form>
    </div>
  </>
);

Form.defaultProps = {
  showExtraPassword: false,
  confirmPassword: '',
  handlePasswordConfirmationChange: () => null,
};

export default Form;
