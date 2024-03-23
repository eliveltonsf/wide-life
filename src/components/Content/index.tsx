import { ReactNode } from 'react';

import styles from './Content.module.css';

interface Props {
  children?: ReactNode;
}

const Content = ({ children }: Props) => <main className={styles.mainContainer}>{children}</main>;

export default Content;
