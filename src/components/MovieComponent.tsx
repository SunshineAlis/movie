"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/utils/requests";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

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
    let isMounted = true; // ✅ Cleanup function-д ашиглах хувьсагч

    const getData = async () => {
      try {
        const [popular, topRated, upcoming] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpComingMovies(),
        ]);

        if (isMounted) {
          //
          setPopularMovies(popular.results.slice(0, 10));
          setTopRatedMovies(topRated.results.slice(0, 10));
          setUpComingMovies(upcoming.results.slice(0, 10));
        }
      } catch (error) {
        console.error("Киноны мэдээллийг авахад алдаа гарлаа:", error);
      }
    };

    getData();

    return () => {
      isMounted = false; // ✅
    };
  }, []);

  return (
    <div className="w-full px-10 py-5 relative dark:text-white">
      {/* Dynamic Movie List Rendering */}
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
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-black text-2xl font-bold dark:text-white">{title}</h2>
            <button
              onClick={() => router.push(path)}
              className="text-white bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              See More
            </button>
          </div>
          <div className="grid grid-cols-5 gap-6">
          
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div  className="w-[200px] cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <h3 className="text-black text-lg mt-2 dark:text-white">{movie.title}</h3>
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


