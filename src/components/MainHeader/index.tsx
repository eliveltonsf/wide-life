import React from 'react';
import Container from 'react-bootstrap/Container';
import Profile from 'components/Profile';

import styles from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={styles.headerContainer}>
      <div>
        <img alt="" src="logo-title.png" width="30" height="30" className="d-inline-block align-top" />
      </div>
      <Profile profileType="user" />
    </header>
  );
};

export default MainHeader;
