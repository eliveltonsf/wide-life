/* eslint-disable @typescript-eslint/no-explicit-any */
import ScheduleTable from 'components/ScheduleTable';
import styles from './Schedules.module.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { MdAdd } from 'react-icons/md';
import SelectInput from 'components/SelectInput';
import React, { useEffect, useMemo, useState } from 'react';

import scheduleFake from 'repositories/scheduleFake.json';

const Schedules = () => {
  const [data, setData] = useState<any>();
  const [dateSelected, setDateSelected] = useState('');

  const registerDate = useMemo(() => {
    const unique: string[] = [];

    scheduleFake.forEach((item) => {
      const date = item.doctor.date;

      if (!unique.includes(date)) {
        unique.push(date);
      }
    });

    return unique.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  useEffect(() => {
    const filteredDate = scheduleFake.filter((item) => {
      return item.doctor.date === dateSelected;
    });
    setData(filteredDate);
    console.log({ data });
  }, [scheduleFake, dateSelected]);

  return (
    <div className={styles.schedulesContainer}>
      <div>
        <h1>Agendamentos</h1>
        <SelectInput
          type="data"
          options={registerDate}
          defaultValue={dateSelected}
          onChange={(e: any) => setDateSelected(e.target.value)}
        />
      </div>

      <div>
        <InputGroup className={`mb-3 mt-3 ${styles.inputGroup}`}>
          <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        </InputGroup>
        <Button className={styles.btnPrimary}>
          <a href="/register-schedule">
            <MdAdd size={27} />
          </a>
        </Button>{' '}
      </div>
      <ScheduleTable options={data} />
    </div>
  );
};

export default Schedules;
