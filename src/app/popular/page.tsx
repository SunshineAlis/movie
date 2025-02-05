"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPopularMovies } from "@/utils/requests"; //
import { Pagination } from "@/components/Pagination";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMovies = async () => {
    try {
      const data = await getPopularMovies(page);
      setMovies(data.results || []);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

      {/* Movies List */}
      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="w-[200px] cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="w-[250px] h-[300px] object-cover rounded-lg"
              />
              <h3 className="text-black text-lg mt-2">{movie.title}</h3>
              <div className="flex items-center mt-1">
                <FaStar className="text-yellow-500" />
                <span className="text-black ml-1">{movie.vote_average}/10</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination fetchData={fetchMovies} totalPages={totalPages} />
      <Footer />
    </div>
  );
}

