import React, { useState } from 'react';
import styles from './MovieTile.module.scss';
import ImageWithFallback from '@/components/atoms/Image/Image';
import EditIcon from '../../../public/images/edit-button.svg';
import TrashIcon from '../../../public/images/delete-button.svg';
import MovieForm from '@/components/organisms/MovieForm/MovieForm';
import { AddMovie } from '@/models';
import { useRouter } from 'next/router';


type Props = {
    _id: string;
    title: string;
    poster: string;
    description: string;
    duration: number;
    onDelete: (id: string) => void;
    onModify: (movieData: AddMovie, id?: string) => void;
};

const MovieTile: React.FC<Props> = ({ title, description, duration, poster, _id, onDelete, onModify }) => {

    const [isEditing, setIsEditing] = useState(false);

    const router = useRouter();

    return (
        <>
        <div className={styles.movieTile}>
            <div onClick={() => router.push(`/movies/${_id}`)} className='o-aspect-ratio o-aspect-ratio--2:3 w-full'>
                <ImageWithFallback
                    className='o-aspect-ratio__content'
                    src={poster}
                    alt={`${title} poster`}
                    fallbackSrc="/images/fallback.jpg"
                    width={200} // Fixed width
                    height={300} // Fixed height
                />
            </div>
            <div onClick={() => router.push(`/movies/${_id}`)}>{title}</div>

            <div className={styles.actions}>
                <button onClick={() => setIsEditing(true)} className={styles.actionButton}>
                    <EditIcon className={styles.icon} />
                </button>
                <button onClick={() => onDelete(_id)} className={styles.actionButton}>
                    <TrashIcon className={styles.icon} />
                </button>
            </div>

        </div>
        {
            isEditing && <MovieForm onClose={() => setIsEditing(false)} onSubmit={onModify}  id={_id} currentMovie={{title, description, duration, poster}} />
        }
        </>
    );
};

export default MovieTile;