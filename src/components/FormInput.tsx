import React from 'react';

import formInputStyles from '../styles/forminput.module.scss';
import { InputEvent } from '../types';

interface FormInputProps {
  type: string;
  labelText: string;
  name: string;
  value?: string;
  handleChange?: InputEvent;
  placeholderText: string;
}

const FormInput = ({
  type,
  labelText,
  name,
  value,
  handleChange,
  placeholderText,
}: FormInputProps): JSX.Element => (
  <div className={formInputStyles.forminput}>
    <p className={formInputStyles.text}>{labelText}</p>
    <input
      type={type}
      name={name}
      value={value}
      data-testid={name}
      onChange={handleChange}
      placeholder={placeholderText}
      required
      className={formInputStyles.input}
    />
  </div>
);

FormInput.defaultProps = {
  value: null,
  handleChange: () => null,
};

export default FormInput;
