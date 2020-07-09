import React, { FC } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import infoStyles from '../styles/info.module.scss';
import Button from './Button';
import { ButtonEvent } from '../types';

interface InfoProps {
  title: string;
  imageUrl: string;
  description: string;
  handleClick: ButtonEvent;
  handleSelect: any;
  btnClolor: string;
  showDate: boolean;
  text: string;
  dateValue: string;
}

const Info: FC<InfoProps> = ({
  title,
  imageUrl,
  description,
  handleClick,
  handleSelect,
  btnClolor,
  showDate,
  text,
  dateValue,
}): JSX.Element => (
  <div className={infoStyles.info}>
    <h3
      className={infoStyles.title}
    >
      {title}
    </h3>
    <img
      src={imageUrl}
      alt={title}
      className={infoStyles.potd}
    />
    <div className={infoStyles.infoGroup}>
      <Button
        text={text}
        handleClick={handleClick}
        color={btnClolor}
      />
      {
        showDate ? (
          <DayPickerInput onDayChange={handleSelect} value={dateValue} />
        ) : null
      }
    </div>
    <p className={infoStyles.description}>{description}</p>
  </div>
);

export default Info;
