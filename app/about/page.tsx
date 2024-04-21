import styles from '@/styles/pages/About.module.scss';

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About Cinema Scheduler',
  description: 'Discover the technologies and features behind Cinema Scheduler, a cutting-edge portfolio project.',
}

export default function About() {
  return (
    <div className="o-container o-container--2xl my-16">
      <main>
        <h1 className={styles.title}>Technologies Behind Cinema Scheduler</h1>
        <p className={styles.description}>
          Cinema Scheduler is a testament to modern web development, showcasing a blend of innovative technologies and practical features. This portfolio project is built on a robust backend using Rust and the Axum library, ensuring high performance and reliability.
        </p>
        <p>
          The main page features an interactive calendar powered by react-big-calendar, enhanced with real-time updates through WebSockets. This allows for a dynamic and responsive user experience, keeping cinema schedules up-to-the-minute.
        </p>
        <p>
          For movie and hall management, Cinema Scheduler utilizes a straightforward REST API, with the movies page integrating the OMDB API to suggest additions to the movie collection. This feature not only streamlines the process of updating movie listings but also enriches the database with comprehensive movie details.
        </p>
        <p>
          Designed with both functionality and aesthetics in mind, Cinema Scheduler is a showcase of a programmer&#39;s ability to integrate various technologies into a cohesive and user-friendly platform. Whether you&#39;re interested in the technical prowess of Rust and Axum, the interactivity of WebSockets, or the seamless integration of third-party APIs, Cinema Scheduler stands as a compelling portfolio piece for any developer looking to demonstrate their skill and creativity.
        </p>
      </main>
    </div>
  );
}