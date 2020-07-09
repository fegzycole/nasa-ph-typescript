import React, { FC } from 'react';

import '../styles/arrow.scss';
import { MouseEvent, KeyboardEvent } from '../types';

interface ArrowProps {
  outerClassName: string;
  innerClassName: string;
  handleClick: MouseEvent;
  handleKeyPress: KeyboardEvent;
}

const Arrow: FC<ArrowProps> = ({
  outerClassName,
  innerClassName,
  handleClick,
  handleKeyPress,
}): JSX.Element => (
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
