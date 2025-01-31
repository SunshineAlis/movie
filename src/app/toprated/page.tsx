"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

export default function TopRatedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=ed40c9caeaf1b576a8d758395b370665"
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch top rated movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Top Rated Movies
      </h1>
      <div className="grid grid-cols-5 gap-6 dark:text-white">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[200px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <h3 className="text-black text-lg mt-2 dark:text-white">
              {movie.title}
            </h3>
            <div className="flex items-center mt-1 dark:text-white">
              <FaStar className="text-yellow-500" />
              <span className="text-black ml-1 dark:text-white">
                {movie.vote_average}
                <span className="text-gray dark:text-yellow">/10</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
