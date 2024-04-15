import { MovieDetail } from '@/models';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styles from '@/styles/pages/MovieDetailPage.module.scss'; // Assuming similar styling can be applied
import Image from 'next/image';

type MovieProps = {
  movie: MovieDetail
};

const MovieDetailPage: NextPage<MovieProps> = ({ movie }) => {
  return (
    <section className='o-container o-container--2xl'>
      <div className={styles.movieDetail}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.capacity}>Duration: {movie.duration} minutes</p>
        {movie.description && <p className={styles.description}>{movie.description}</p>}
        {movie.poster && <Image width={300} height={426} className='object-cover' src={movie.poster} alt={movie.title} />}

        <h2 className={styles.sectionTitle}>Associated Halls:</h2>
        <ul className={styles.movieList}>
          {movie.halls.map((hall) => (
            <li key={hall._id} className={styles.movieItem}>{hall.name} (Capacity: {hall.capacity})</li>
          ))}
        </ul>
        <h2 className={styles.sectionTitle}>Sessions:</h2>
        <ul className={styles.sessionList}>
          {movie.sessions.map((session) => (
            <li key={session._id} className={styles.sessionItem}>Session at {
              session.start} - Ends at {session.end}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`${process.env.API_URL}/movies/${id}`);
  if (!res.ok) {
    return { notFound: true };
  }
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
};

export default MovieDetailPage;