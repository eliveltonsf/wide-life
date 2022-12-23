import React, { ReactNode } from 'react';

import styles from './Layout.module.css';

import MainHeader from 'components/MainHeader';
import Aside from 'components/Aside';
import Content from 'components/Content';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className={styles.layoutContainer}>
    <MainHeader />
    <Aside />
    <Content>{children}</Content>
  </div>
);

export default Layout;
