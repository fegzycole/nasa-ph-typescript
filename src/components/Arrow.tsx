import React from 'react';

import '../styles/arrow.scss';

interface ArrowProps {
  outerClassName: string;
  innerClassName: string;
  handleClick: Function;
}

const Arrow = ({
  outerClassName,
  innerClassName,
  handleClick,
}: ArrowProps): JSX.Element => (
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
