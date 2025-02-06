"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTopRatedMovies } from "../../utils/requests";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

export default function TopRatedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const fetchMovies = async () => {
    try {
      const data = await getTopRatedMovies(page);
      setMovies(data.results || []);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch top-rated movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [page]); //

  return (
    <div className="p-6 dark:text-white">
      <Header />
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Top Rated Movies</h1>

      {/* Movies List */}
      <div className="grid grid-cols-5 gap-6 dark:text-white">
        {movies.map((movie) => (
          <Link  key={movie.id} href={`/movie/${movie.id}`}>
          <div className=" cursor-pointer w-[200px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <h3 className="text-black text-lg mt-2 dark:text-white">{movie.title}</h3>
            <div className="flex items-center mt-1 dark:text-white">
              <FaStar className="text-yellow-500" />
              <span className="text-black ml-1 dark:text-white">{movie.vote_average}/10</span>
            </div>
          </div>
          </Link>
        ))}
      </div>
      <Pagination fetchData={setPage} totalPages={totalPages} />
      <Footer />
    </div>
  );
}
