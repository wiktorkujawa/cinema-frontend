import React from 'react';
import styles from './MoviesGrid.module.scss'; // Import the CSS module
import MovieTile from '@/components/molecules/MovieTile/MovieTile';
import classNames from 'classnames';
import { Movie, AddMovie } from '@/models';

type Props = {
  movies: Movie[];
  openAddMovieModal: () => void; // Function to handle the add-new click event
  handleDelete: (id: string) => void; // Function to handle the add-new click event
  handleModify: (hallData: AddMovie, id?: string ) => void; // Function to handle the modify click event

};

const MoviesGrid: React.FC<Props> = ({ movies, openAddMovieModal, handleDelete, handleModify }) => {

  return (
    <div className={classNames(styles.moviesGrid, 'o-container o-container--2xl')}>
      {movies.map((movie) => (
        <MovieTile 
          onModify={handleModify} 
          onDelete={handleDelete} 
          key={movie._id} 
          {...movie} />
      ))}
      <div className={styles.movieTile} onClick={openAddMovieModal}>
        <span className={styles.addNew}>+</span>
      </div>
    </div>
  );
};

export default MoviesGrid;