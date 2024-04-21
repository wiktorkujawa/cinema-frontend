import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import styles from './HallForm.module.scss';
import { AddHall } from '@/models';

type Props = {
    onClose: () => void;
    onSubmit: (newHallData: AddHall, id?: string) => void;
    currentHall?: AddHall;
    id?: string;
};

const HallForm: React.FC<Props> = ({ onClose, onSubmit, currentHall, id }) => {

    const [hall, setHall] = useState<AddHall>({
        name: '',
        capacity: 0,
        description: '',
    })

    useEffect(() => {
        if(currentHall) {
            setHall(currentHall)
        }
    }, [currentHall]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(id) {
            onSubmit(hall, id);
        } else {
            onSubmit(hall);
        }
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setHall(prev => ({
            ...prev,
            [name]: type == "number" ? +value : value
        }))
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={hall.name} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="capacity">Capacity</label>
                        <input type="number" name="capacity" value={hall.capacity} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={hall.description} onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton}>{id ? "Update" : "Add" } Hall</button>
                </form>
            </div>
        </div>
    );
};

export default HallForm;
