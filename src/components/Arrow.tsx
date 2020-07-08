import React from 'react';

import '../styles/arrow.scss';
import { MouseEvent, KeyboardEvent } from '../types';

interface ArrowProps {
  outerClassName: string;
  innerClassName: string;
  handleClick: MouseEvent;
  handleKeyPress: KeyboardEvent;
}

const Arrow = ({
  outerClassName,
  innerClassName,
  handleClick,
  handleKeyPress,
}: ArrowProps): JSX.Element => (
  <div
    className={outerClassName}
    onClick={handleClick}
    onKeyPress={handleKeyPress}
    role="button"
    tabIndex={0}
  >
    <i className={innerClassName} />
  </div>
);

export default Arrow;
