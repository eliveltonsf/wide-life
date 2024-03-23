import React from 'react';

import styles from './Aside.module.css';

import { MdAppRegistration, MdDashboard } from 'react-icons/md';

const Aside: React.FC = () => {
  return (
    <aside className={styles.asideContainer}>
      <div>
        <a href="/">
          <MdDashboard />
          Dashboard
        </a>

        <a href="/schedules">
          <MdAppRegistration />
          Agendamentos
        </a>
      </div>
    </aside>
  );
};

export default Aside;
