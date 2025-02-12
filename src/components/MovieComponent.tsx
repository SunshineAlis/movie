"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaStar } from "react-icons/fa";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/utils/requests";
import Link from "next/link";
import { Movie } from "@/types";

const MovieComponent = ({
  selectedCategory,
}: {
  selectedCategory?: string;
}) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const [popular, topRated, upcoming] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpComingMovies(),
        ]);

        if (isMounted) {
          setPopularMovies(popular.results.slice(0, 10));
          setTopRatedMovies(topRated.results.slice(0, 10));
          setUpComingMovies(upcoming.results.slice(0, 10));
        }
      } catch (error) {
        console.error(" failed:", error);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-[1200px] w-[100%] m-auto mx-[1%] px-[2%] dark:text-white">
      {[
        { title: "Upcoming Movies", movies: upComingMovies, path: "/upcoming" },
        { title: "Popular Movies", movies: popularMovies, path: "/popular" },
        {
          title: "Top Rated Movies",
          movies: topRatedMovies,
          path: "/topRated",
        },
      ].map(({ title, movies, path }) => (
        <div key={title}>
          <div className="flex justify-between items-center">
            <h2 className="text-black text-2xl ml-[20px] mt-[10px] font-bold dark:text-white">
              {title}
            </h2>
            <button
              onClick={() => router.push(path)}
              className="flex items-center mt-[10px]  py-2 gap-[10px] lg:text-black"
            >
              See More
              <FaArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 gap-2 md:grid-cols-4 gap-2 lg:grid-cols-5 gap-4  md:gap-2">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="cursor-pointer">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="h-60 object-cover rounded-lg"
                  />
                  <h3 className="text-black text-lg mt-2 dark:text-white">
                    {movie.title}
                  </h3>
                  <div className="flex items-center mt-1 dark:text-white">
                    <FaStar className="text-yellow-500" />
                    <span className="text-black ml-1 dark:text-white">
                      {movie.vote_average}/10
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieComponent;
