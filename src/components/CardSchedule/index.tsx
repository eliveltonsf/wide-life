/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Card from 'react-bootstrap/Card';
import formatCurrency from 'utils/formatCurrency';

import styles from './CardSchedule.module.css';

interface ICardScheduleProps {
  options: [
    {
      name: string;
      email: string;
      cpf: string;
      doctor: {
        name: string;
        crm: number;
        date: string;
        hour: number;
      };
      address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        country: string;
        long: string;
        lat: string;
      };
      price: number;
    }
  ];
}

const CardSchedule: React.FC<ICardScheduleProps> = ({ options }) => {
  return (
    <>
      {options &&
        options.map((schedule, index) => (
          <Card className="mb-3">
            <Card.Body className={styles.cardScheduleBody}>
              <div key={index} className={styles.cardScheduleContainer}>
                <div>
                  <div className="d-flex align-items-center">
                    <img
                      src="user-default.png"
                      alt=""
                      style={{ width: '45px', height: '45px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{schedule.name}</p>
                      <p className="text-muted mb-0">{schedule.email}</p>
                      <p className="text-muted mb-0">{schedule.cpf}l</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="fw-bold mb-0"> {schedule.doctor.name}</p>
                  <p className="text-muted mb-0"> {schedule.doctor.date}</p>
                </div>
                <div>
                  <p> {formatCurrency(schedule.price)}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default CardSchedule;
