import React, { useState } from 'react';
import styles from './HallTile.module.scss';
import EditIcon from '@/public/images/edit-button.svg';
import TrashIcon from '@/public/images/delete-button.svg';
import HallForm from '@/components/molecules/HallForm/HallForm';
import { AddHall } from '@/models';
import { useRouter } from 'next/navigation';

type Props = {
    _id: string;
    name: string;
    capacity: number;
    description: string;
    onDelete: (id: string) => void;
    onModify: (hallData: AddHall, id?: string) => void;
};

const HallTile: React.FC<Props> = ({ name, capacity, description, _id, onDelete, onModify }) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
        <div className={styles.hallTile}>
            <div onClick={() => router.push(`/halls/${_id}`)} className={styles.hallInfo}>
                <div>{name}</div>
                <div>{description}</div>
                <div>Capacity: {capacity}</div>
            </div>

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
            isEditing && <HallForm onClose={() => setIsEditing(false)} onSubmit={onModify}  id={_id} currentHall={{name, capacity, description}} />
        }
        </>
    );
};

export default HallTile;
