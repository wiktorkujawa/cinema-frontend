import { HallDetail } from '@/models';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import moment from 'moment';
import styles from '@/styles/pages/HallDetailPage.module.scss';

type HallProps = {
  hall: HallDetail
};

const HallDetailPage: NextPage<HallProps> = ({ hall }) => {
  return (
    <section className='o-container o-container--2xl'>
      <div className={styles.hallDetail}>
        <h1 className={styles.title}>{hall.name}</h1>
        <p className={styles.capacity}>Capacity: {hall.capacity}</p>
        <p className={styles.description}>{hall.description}</p>
        <h2 className={styles.sectionTitle}>Associated Movies</h2>
        <ul className={styles.movieList}>
          {hall.movies.map((movie) => (
            <li key={movie._id} className={styles.movieItem}>{movie.title}</li>
          ))}
        </ul>
        <h2 className={styles.sectionTitle}>Sessions</h2>
        <ul className={styles.sessionList}>
          {hall.sessions.map((session) => (
            <li key={session._id} className={styles.sessionItem}>
              Session at {moment(session.start).format('YYYY-MM-DD HH:mm')} - Ends at {moment(session.end).format('YYYY-MM-DD HH:mm')}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`${process.env.API_URL}/halls/${id}`, {
    next: {
      revalidate: 30
    }
  });
  if (!res.ok) {
    return { notFound: true };
  }
  const hall = await res.json();

  return {
    props: {
      hall,
    },
  };
};

export default HallDetailPage;