import { Menu } from '../../molecules/Menu/Menu';
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <Menu />
  </header>
);