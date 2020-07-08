import React, { FC } from 'react';

import '../styles/arrow.scss';

interface ArrowProps {
  outerClassName: string;
  innerClassName: string;
  handleClick: Function;
}

const Arrow: FC<ArrowProps> = ({ outerClassName, innerClassName, handleClick }): JSX.Element => (
  <div
    className={outerClassName}
    onClick={() => handleClick()}
    onKeyPress={() => handleClick()}
    role="button"
    tabIndex={0}
  >
    <i className={innerClassName} />
  </div>
);

export default Arrow;