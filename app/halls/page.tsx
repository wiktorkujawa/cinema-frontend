import { Hall } from '@/models';
import HallsContainer from '@/components/organisms/HallsContainer/HallsContainer';

export default async function HallsPage() {
  const halls = await getHalls();

  return (
    <HallsContainer halls={halls} />
  );
}

const getHalls = async () => {
  const res = await fetch(`${process.env.API_URL}/halls`, {
    next: {
      revalidate: 30
    }
  });
  const halls: Hall[] = await res.json();

  return halls;
}