import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import styles from './Check.module.css';

const CheckHours = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('0');

  const radios = [
    { name: '7:00', value: '1' },
    { name: '8:00', value: '2' },
    { name: '9:00', value: '3' },
    { name: '10:00', value: '4' },
    { name: '11:00', value: '5' },
    { name: '12:00', value: '6' },
    { name: '15:00', value: '7' },
    { name: '16:00', value: '8' },
    { name: '17:00', value: '9' },
    { name: '18:00', value: '10' },
  ];

  return <div className={styles.checkContainer}></div>;
};

export default CheckHours;
