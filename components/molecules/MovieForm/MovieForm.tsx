import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import styles from './MovieForm.module.scss';
import useOutsideAlerter from '@/hooks/UseOutsideAlerter';
import { AddMovie } from '@/models';

type OMDBMovie = {
    Poster: string,
    Title: string,
    Type: string,
    Year: string
    imdbID: string,
    Runtime?: string,
    Plot?: string
}

type Props = {
    onClose: () => void;
    onSubmit: (newMovieData: AddMovie, id?: string) => void;
    currentMovie?: AddMovie;
    id?: string;
};


const MovieForm: React.FC<Props> = ({ onClose, onSubmit, currentMovie, id }) => {

    const [showSuggestions, setShowSuggestions] = useState(true);
    const wrapperRef = useRef(null);

    const [movie, setMovie] = useState<AddMovie>({
        title: '',
        duration: 0,
        description: '',
        poster: ''
    })

    useEffect(() => {
        if(currentMovie) {
            setMovie(currentMovie)
        }
    }, [currentMovie]);

    const [suggestions, setSuggestions] = useState<OMDBMovie[]>([]);

    useEffect(() => {
        if (movie.title.length > 2) {
            fetch(`https://www.omdbapi.com/?s=${movie.title}&apikey=${process.env.OMDB_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.Search) {

                        const titleEndsWithYear = /\(\d{4}\)$/.test(movie.title);
                        if (titleEndsWithYear) {
                            setSuggestions([]);
                        }
                        else {
                            setSuggestions(data.Search.filter((suggestion: OMDBMovie) => `${suggestion.Title} (${suggestion.Year})`.includes(movie.title)));
                        }
                    }
                });
        } else {
            setSuggestions([]);
        }
    }, [movie.title]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(id) {
            onSubmit(movie, id);
        } else {
            onSubmit(movie);
        }
        onClose();
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setShowSuggestions(true);

        setMovie(prev => ({
            ...prev,
            [name]: type == "number" ? +value : value
        }))
    }

    const handleSuggestionClick = (suggestion: OMDBMovie) => {
        setShowSuggestions(false);

        const titleEndsWithYear = /\(\d{4}\)$/.test(suggestion.Title);
        const formattedTitle = titleEndsWithYear ? suggestion.Title : `${suggestion.Title} (${suggestion.Year})`;

        setMovie({
            title: formattedTitle,
            duration: parseInt(suggestion.Runtime || '0', 10),
            description: suggestion.Plot || '',
            poster: suggestion.Poster
        });

        setSuggestions([]);
    }

    useOutsideAlerter(wrapperRef, () => setShowSuggestions(false));

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <div ref={wrapperRef} >
                            <input className='w-full' name="title" value={movie.title} onChange={handleChange} />
                            <div className={styles.suggestionsTileList}>
                                {showSuggestions && suggestions.map((suggestion, index) => (
                                    <div key={index} className={styles.suggestionTile} onClick={() => handleSuggestionClick(suggestion)}>
                                        <img src={suggestion.Poster} alt={`${suggestion.Title} poster`} className={styles.suggestionPosterTile} />
                                        <div className={styles.suggestionTitleTile}>
                                            {/\(\d{4}\)$/.test(suggestion.Title) ? suggestion.Title : `${suggestion.Title} (${suggestion.Year})`}

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="duration">Duration (minutes)</label>
                        <input type="number" name="duration" value={movie.duration} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={movie.description} onChange={handleChange}></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="poster">Poster URL</label>
                        <input type="text" name="poster" value={movie.poster} onChange={handleChange} />
                        {movie.poster && (
                            <div className={styles.posterPreview}>
                                <img src={movie.poster} alt="Movie Poster Preview" className={styles.posterImage} />
                            </div>
                        )}
                    </div>
                    <button type="submit" className={styles.submitButton}>{id ? "Update" : "Add" } Movie</button>
                </form>
            </div>
        </div>
    );
};

export default MovieForm;