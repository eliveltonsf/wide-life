/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import CountUp from 'react-countup';

import arrowUpImg from 'assets/arrow-up.svg';
import dolarImg from 'assets/dolar.svg';

import styles from './CutomBox.module.css';

interface ICutomBoxProps {
  type?: 'price';
  title: string;
  amount: number | string | any;
  icon: 'dolar' | 'arrowUp';
  color: string;
}

const iconList: { [key: string]: any } = {
  dolar: dolarImg,
  arrowUp: arrowUpImg,
};

const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];

const CutomBox: React.FC<ICutomBoxProps> = ({ type, title, amount, icon, color }) => {
  const IconSelected = getKeyValue(iconList)(icon as string);

  return (
    <div className={styles.cutomBoxContainer} style={{ background: `${color}` }}>
      <span>{title}</span>
      {type === 'price' ? (
        <h4>
          <strong>R$</strong>
          <CountUp duration={1.75} end={amount} separator="." decimal="," decimals={2} />
        </h4>
      ) : (
        <h1>
          <CountUp duration={0.5} end={amount} decimals={0} />
        </h1>
      )}
      <img src={IconSelected} alt={title} />
    </div>
  );
};

export default CutomBox;
