import React from 'react';
import { Movie } from '@/models';
import MoviesContainer from '@/components/organisms/MoviesContainer/MoviesContainer';

const getMovies = async () => {
    const res = await fetch(`${process.env.API_URL}/movies`, {
      next: {
        revalidate: 30
      }
    });
    const movies: Movie[] = await res.json();
  
    return movies;
  }

export default async function MoviesPage() {

  const movies = await getMovies();

  return (
    <MoviesContainer movies={movies} />
  );
}

