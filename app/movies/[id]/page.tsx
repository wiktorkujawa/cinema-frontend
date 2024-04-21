import { Movie, MovieDetail } from '@/models';
import React from 'react';
import styles from '@/styles/pages/MovieDetailPage.module.scss';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Params = {
  id: string
};

const MovieDetailPage = async ({ params }: { params: Params }) => {
  const movie = await getMovieDetail(params.id);

  if (!movie) {
    notFound()
  }
  return (
    <section className='o-container o-container--2xl'>
      <div className={styles.movieDetail}>
        <h1 className={styles.title}>{movie?.title}</h1>
        <p className={styles.capacity}>Duration: {movie?.duration} minutes</p>
        {movie.description && <p className={styles.description}>{movie.description}</p>}
        {/* {movie.poster && <Image width={300} height={426} className='object-cover' src={movie.poster} alt={movie.title} />} */}
        {movie.poster && <img width={300} height={426} className='object-cover' src={movie.poster} alt={movie.title} />}


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

export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.API_URL}/movies`, {
      next: {
        revalidate: 30
      }
    });
    const movies: Movie[] = await res.json();
  
    return movies.map((movie) => ({
      params: { id: movie._id }
    }));
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const res = await fetch(`${process.env.API_URL}/movies/${params.id}`, {
      next: {
        revalidate: 30
      }
    }).catch(() => notFound());
    
    const movie: MovieDetail = await res.json();
  
    return {
        title: movie.title,
        description: movie.description
    }
}


export const getMovieDetail = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/movies/${id}`, {
    next: {
      revalidate: 30
    }
  });
  if (!res.ok) {
    return undefined;
  }
  const movie: MovieDetail = await res.json();

  return movie;
  
};

export default MovieDetailPage;