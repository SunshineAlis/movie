"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUpComingMovies } from "../../utils/requests";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { Movie } from "@/types";

export default function UpcomingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMovies = async () => {
    try {
      const data = await getUpComingMovies(page);
      setMovies(data.results || []);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [page]);
  console.log(fetchMovies);
  return (
    <div className="max-w-[1200px] w-[100%] m-auto dark:text-white">
      <Header />
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Upcoming Movies
      </h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 gap-2 md:gap-2 dark:text-white">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className=" cursor-pointer dark:text-white">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="object-cover rounded-lg"
              />
              <h3 className="text-black text-lg mt-2 dark:text-white">
                {movie.title}
              </h3>
              <div className="flex items-center mt-1 dark:text-white">
                <FaStar className="text-yellow-500 " />
                <span className="text-black ml-1 dark:text-white">
                  {movie.vote_average}/10
                </span>
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
