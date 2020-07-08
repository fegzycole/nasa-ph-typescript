import React from 'react';

import buttonStyles from '../styles/button.module.scss';

interface ButtonProps {
  text: string;
  handleClick: Function;
  color: string;
}

const Button = ({ text, handleClick, color }: ButtonProps): JSX.Element => (
  <button
    type="button"
    style={{ backgroundColor: color }}
    onClick={() => handleClick}
    className={buttonStyles.button}
  >
    {text}
  </button>
);

export default Button;
