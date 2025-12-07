import { Hall, HallDetail } from '@/models';
import React from 'react';
import { format } from 'date-fns';
import styles from '@/styles/pages/HallDetailPage.module.scss';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Params = {
    id: string
  };

const HallDetailPage = async ({ params }: { params: Promise<Params> }) => {
    const { id } = await params;
    const hall = await getHallDetail(id);

    if (!hall) {
        notFound()
      }
  return (
    <section className='o-container o-container--2xl'>
      <div className={styles.hallDetail}>
        <h1 className={styles.title}>{hall.name}</h1>
        <p className={styles.capacity}>Capacity: {hall.capacity}</p>
        <p className={styles.description}>{hall.description}</p>
        <h2 className={styles.sectionTitle}>Associated Halls</h2>
        <ul className={styles.moviesList}>
          {hall?.movies.map((movie) => (
            <li key={movie._id} className={styles.movieItem}>{movie.title}</li>
          ))}
        </ul>
        <h2 className={styles.sectionTitle}>Sessions</h2>
        <ul className={styles.sessionList}>
          {hall.sessions.map((session) => (
            <li key={session._id} className={styles.sessionItem}>
              Session at {format(session.start,'yyyy-MM-dd HH:mm')} - Ends at {format(session.end,'yyyy-MM-dd HH:mm')}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.API_URL}/halls`, {
      next: {
        revalidate: 30
      }
    });
    const halls: Hall[] = await res.json();
  
    return halls.map((hall) => ({
      params: { id: hall._id }
    }));
}

export const generateMetadata = async ({ params }: { params: Promise<Params> }): Promise<Metadata> => {
    const { id } = await params;
    const res = await fetch(`${process.env.API_URL}/halls/${id}`, {
      next: {
        revalidate: 30
      }
    }).catch(() => notFound());
    
    const hall: HallDetail = await res.json();
  
    return {
        title: hall.name,
        description: hall.description
    }
}

const getHallDetail = async (id: string) => {
    const res = await fetch(`${process.env.API_URL}/halls/${id}`, {
      next: {
        revalidate: 30
      }
    });
    if (!res.ok) {
      return undefined;
    }
    const hall: HallDetail = await res.json();
  
    return hall;
    
  };


export default HallDetailPage;