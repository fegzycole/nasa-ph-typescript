import React, { FC } from 'react';

import SpinnerStyles from '../styles/spinner.module.scss';

interface SpinnerProps {
  addOverlay?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ addOverlay }) => (
  <div
    className={SpinnerStyles.Overlay}
    style={{ backgroundColor: addOverlay ? 'rgba(0,0,0,0.5)' : '' }}
  >
    <div className={SpinnerStyles.Spinner} />
  </div>
);

Spinner.defaultProps = { addOverlay: false };

export default Spinner;
