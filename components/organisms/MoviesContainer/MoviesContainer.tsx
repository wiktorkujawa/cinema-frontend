'use client';
import React, { useState } from 'react'
import MoviesGrid from '@/components/molecules/MoviesGrid/MoviesGrid';
import MovieForm from '@/components/molecules/MovieForm/MovieForm';
import { AddMovie, Movie } from '@/models';

type Props = {
    movies: Movie[]
}

const MoviesContainer = ({ movies: initialMovies}: Props) => {
    const [showFormModal, setShowFormModal] = useState(false);

  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const handleDelete = async (id:string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/movies/${id}`, { // Your API endpoint
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Failed to delete movie');

      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error adding new movie:', error);
    }

  };

  const handleModify = async (movieData: AddMovie, id?: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/movies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) throw new Error('Failed to add movie');

      const newMovie = await response.json();
      setMovies(movies.map(movie => movie._id === id ? { _id: id ,...newMovie} : movie));
    } catch (error) {
      console.error('Error adding new movie:', error);
    }
  };

    const addNewMovie = async (newMovieData: AddMovie) => {
        try {
          const response = await fetch(`${process.env.API_URL}/movies`, { // Your API endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovieData),
          });
      
          if (!response.ok) throw new Error('Failed to add movie');
      
          const newMovie = await response.json(); // Assuming the API returns the added movie
          setMovies((prevMovies) => [...prevMovies, newMovie]); // Update the movies state
        } catch (error) {
          console.error('Error adding new movie:', error);
        }
      };
  return (
    <>
    <MoviesGrid movies={movies} handleDelete={handleDelete} handleModify={handleModify} openAddMovieModal={() => setShowFormModal(true)} />
      {showFormModal && <MovieForm onSubmit={addNewMovie} onClose={() => setShowFormModal(false)} />}
    </>
  )
}

export default MoviesContainer