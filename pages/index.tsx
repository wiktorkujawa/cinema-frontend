import { Inter } from "next/font/google";
import Calendar from '@/components/organisms/Calendar/Calendar';
import { GetStaticProps } from "next";
import { Hall, Movie } from "@/models";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async () => {
 
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

  const [halls, movies] = await Promise.all([getHalls(), getMovies()]);

  return {
    props: {
      halls,
      movies
    },
  };
};

type Props = {
  halls: Hall[],
  movies: Movie[]
}


export default function Home({ halls, movies}:Props) {
  return (
    <div className={`flex min-h-screen flex-col ${inter.className}`}>
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <Calendar halls={halls} movies={movies} />
      </main>
    </div>
  );
}