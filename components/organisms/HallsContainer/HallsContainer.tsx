'use client';
import React, { useState } from 'react'
import HallsGrid from '@/components/molecules/HallsGrid/HallsGrid';
import HallForm from '@/components/molecules/HallForm/HallForm';
import { AddHall, Hall } from '@/models';

type Props = {
    halls: Hall[]
}

const HallsContainer = ({ halls: initialHalls }: Props) => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [halls, setHalls] = useState<Hall[]>(initialHalls);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${process.env.API_URL}/halls/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to delete hall');

            setHalls(halls.filter(hall => hall._id !== id));
        } catch (error) {
            console.error('Error deleting hall:', error);
        }
    };

    const addNewHall = async (newHallData: AddHall) => {
        try {
            const response = await fetch(`${process.env.API_URL}/halls`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHallData),
            });

            if (!response.ok) throw new Error('Failed to add hall');

            const newHall = await response.json();
            setHalls((prevHalls) => [...prevHalls, newHall]);
        } catch (error) {
            console.error('Error adding new hall:', error);
        }
    };

    const handleModify = async (hallData: AddHall, id?: string) => {
        try {
            const response = await fetch(`${process.env.API_URL}/halls/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hallData),
            });

            if (!response.ok) throw new Error('Failed to add hall');

            const newHall = await response.json();
            setHalls(halls.map(hall => hall._id === id ? { _id: id, ...newHall } : hall));
        } catch (error) {
            console.error('Error adding new hall:', error);
        }
    };
    return (
        <>
            <HallsGrid halls={halls} handleModify={handleModify} handleDelete={handleDelete} openAddHallModal={() => setShowFormModal(true)} />
            {showFormModal && <HallForm onSubmit={addNewHall} onClose={() => setShowFormModal(false)} />}
        </>
    )
}

export default HallsContainer