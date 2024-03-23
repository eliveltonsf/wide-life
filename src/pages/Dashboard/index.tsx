/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import styles from './Dashboard.module.css';

import letterheadFake from 'repositories/letterheadFake.json';
import patientFake from 'repositories/patientFake.json';
import scheduleFake from 'repositories/scheduleFake.json';

import Calender from 'components/Calender';
import CardSchedule from 'components/CardSchedule';
import CutomBox from 'components/CutomBox';
import ReactShadowScroll from 'react-shadow-scroll';

import LetterheadTable from 'components/LetterheadTable';
import { Form, InputGroup } from 'react-bootstrap';

const Dashboard = () => {
  const [data, setData] = useState<any>();
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState('');

  const totalSchedules = useMemo(() => {
    return scheduleFake.length;
  }, [scheduleFake]);

  const totalPatient = useMemo(() => {
    return patientFake.length;
  }, [patientFake]);

  const totalInvoicing = useMemo(() => {
    let soma = 0;
    for (let x = 0; x < scheduleFake.length; x++) {
      soma += scheduleFake[x].price;
    }
    return soma;
  }, [scheduleFake]);

  const checkLetterhead = useMemo(() => {
    return letterheadFake.map((letterhead) => {
      return {
        name: letterhead.name,
        type: letterhead.type,
        description: letterhead.description,
        status: letterhead.status,
      };
    });
  }, []);

  useEffect(() => {
    setDateString(date.toDateString());
  }, [date]);

  useEffect(() => {
    const filteredDate = scheduleFake.filter((item) => {
      return item.doctor.date === dateString;
    });
    setData(filteredDate);
  }, [scheduleFake, dateString]);

  const onChangeCalender = (newDate: SetStateAction<Date>) => {
    setDate(newDate);
  };

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
      </header>
      <div className={styles.dashboardContainer}>
        <aside>
          <div>
            <Form>
              <InputGroup className={`mb-3 mt-3`}>
                <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" />
              </InputGroup>
            </Form>
            <section>
              <CutomBox color="#4CD62B" title="Agendamentos" amount={totalSchedules} icon="arrowUp" />

              <CutomBox color="#53d1ec" title="Pacientes" amount={totalPatient} icon="arrowUp" />

              <CutomBox type="price" color="#E83F5B" title="Faturamento" amount={totalInvoicing} icon="dolar" />
            </section>
          </div>
          <LetterheadTable />
        </aside>
        <aside>
          <section>
            <Calender onChange={onChangeCalender} date={date} margin="0.625rem 0" fontSize="1rem" />
          </section>
          <section>
            <ReactShadowScroll isShadow={false}>
              <div style={{ height: '300px', marginRight: '10px' }}>
                <CardSchedule options={data} />
              </div>
            </ReactShadowScroll>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
