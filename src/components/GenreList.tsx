import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGenres } from "../utils/requests";
import RightArrow from "./Arrow";
import { Genre } from "@/types";

interface GenreListProps {
  showGenres: boolean;
}

export default function GenreList({ showGenres }: GenreListProps) {
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreSelect = (genreId: number) => {
    router.push(`/category/?genres=${genreId}`);
  };

  if (!showGenres) return null; // 

  return (
    <div className="relative z-[999] mt-[40px] ml-[105px]">
      <div className="flex flex-wrap gap-2 mt-2 w-[400px] pb-[10px] absolute left-[-200px] bg-white shadow-lg rounded-lg border z-[1000]">
        <div className="flex flex-col w-[400px] items-center">
          <h2 className="font-bold mr-[300px] mt-[20px] text-2xl dark:text-black border-white">Genres</h2>
          <p className="font-bold mr-[150px] mt-[10px] text-l dark:text-black">
            See lists of movies by genre
          </p>
          <div className="w-[380px] h-[2px] border-2 mt-[5px]" />
        </div>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreSelect(genre.id)}
            className="p-2 rounded flex items-center ml-[10px] mb-[2px] font-bold text-xs border hover:bg-gray-200 dark:text-black"
          >
            {genre.name}
            <RightArrow className={`dark:fill-black-900`} />
          </button>
        ))}
      </div>
    </div>
  );
}
