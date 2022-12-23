/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DatePicker from 'sassy-datepicker';

interface ICalenderProps {
  date: Date;
  margin?: string;
  fontSize?: string;
  onChange(event: React.SetStateAction<Date>): void;
}

const Calender: React.FC<ICalenderProps> = ({ date, onChange, margin, fontSize }: any) => {
  return (
    <DatePicker
      onChange={onChange}
      value={date}
      style={{ width: '100%', margin: `${margin}`, fontSize: `${fontSize}` }}
    />
  );
};

export default Calender;
