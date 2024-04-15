import { Hall, Movie } from "@/models";
import { ChangeEvent, useState } from "react";
import styles from './ModalForm.module.scss';
import { Button } from "@/components/atoms/Button/Button";
import moment from "moment";

type ModalFormProps = {
    onClose: () => void;
    initialFormData: any;
    halls: Hall[];
    movies: Movie[];
    onSubmit: (formData: any) => void;
};

const ModalForm: React.FC<ModalFormProps> = ({ onClose, initialFormData, halls, movies, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>
                <div className={styles.modalHeader}>
                    <h4>Add/Edit Session</h4>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={handleChange} name="title" value={formData.title || ''} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="start">Start</label>
                        <input type="datetime-local" onChange={handleChange} name="start" value={moment(formData.start).format('YYYY-MM-DDThh:mm') || ''} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="end">End</label>
                        <input type="datetime-local"onChange={handleChange} name="end" value={moment(formData.end).format('YYYY-MM-DDThh:mm') || ''} />
                    </div>


                    <div className={styles.formGroup}>
                        <label htmlFor="hall_id">Hall</label>
                        <select name="hall_id" onChange={handleChange} value={formData.hall_id || ''}>
                            {halls.map(hall => (
                                <option key={hall._id} value={hall._id}>{hall.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="movie_id">Movie</label>
                        <select name="movie_id" onChange={handleChange} value={formData.movie_id || ''}>
                            {movies.map(movie => (
                                <option key={movie._id} value={movie._id}>{movie.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.modalFooter}>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default ModalForm;