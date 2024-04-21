'use client';
import Link from 'next/link';
import styles from './Menu.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const Menu = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
    <div className={styles.toggleContainer}>
      <button onClick={() => setToggleMenu(prev => !prev)} className={classNames(styles.toggleMenu, {[styles.mobileToggle]: toggleMenu})}>-</button>
      </div>
      <nav className={classNames(styles.menu, { [styles.mobileMenu]: toggleMenu })}>
        <Link className={styles.link} href="/" passHref>
          Home
        </Link>
        <Link className={styles.link} href="/about" passHref>
          About
        </Link>
        <Link className={styles.link} href="/movies" passHref>
          Movies
        </Link>
        <Link className={styles.link} href="/halls" passHref>
          Halls
        </Link>
      </nav>
    </>
  )
};