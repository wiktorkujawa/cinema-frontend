import Calendar from '@/components/organisms/Calendar/Calendar';
import { Hall, Movie } from "@/models";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Cinema Scheduler',
  description: 'Schedule your movie showtimes with this interactive websocket calendar',
}


  const getHalls = async () => {
    const res = await fetch(`${process.env.API_URL}/halls`, {
      next: {
        revalidate: 30
      }
    });
    const halls: Hall[] = await res.json();
    return halls;
  };
  const getMovies = async () => {
    const res = await fetch(`${process.env.API_URL}/movies`, {
      next: {
        revalidate: 30
      }
    });
    const movies: Movie[] = await res.json();
    return movies;
  };

export default async function Home() {
    const [halls, movies] = await Promise.all([getHalls(), getMovies()]);
  return (
        <Calendar halls={halls} movies={movies} />
  );
}