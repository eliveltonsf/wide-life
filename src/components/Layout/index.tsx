import { ReactNode } from 'react';

import styles from './Layout.module.css';

import Aside from 'components/Aside';
import Content from 'components/Content';
import MainHeader from 'components/MainHeader';

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
