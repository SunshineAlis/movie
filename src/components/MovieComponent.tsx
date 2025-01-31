"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { getPopularMovies } from "@/app/utils/requests";

interface Movie {
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
    const getData = async () => {
      const { results } = await getPopularMovies();
      console.log(results);

      setPopularMovies(results.slice(0, 10));
    };

    getData();
  }, []);

  return (
    <div className="w-full px-10 py-5 relative">
      {/* Upcoming Movies */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-black text-2xl font-bold">Upcoming Movies</h2>
        <button
          onClick={() => router.push("/upcoming")}
          className="text-white bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          See More
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {upComingMovies.map((movie) => (
          <div key={movie.id} className="w-[200px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <h3 className="text-black text-lg mt-2">{movie.title}</h3>
            <div className="flex items-center mt-1">
              <FaStar className="text-yellow-500" />
              <span className="text-black ml-1">{movie.vote_average}/10</span>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Movies */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-black text-2xl font-bold">Popular Movies</h2>
        <button
          onClick={() => router.push("/popular")}
          className="text-white bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          See More
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {popularMovies.map((movie) => (
          <div key={movie.id} className="w-[200px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <h3 className="text-black text-lg mt-2">{movie.title}</h3>
            <div className="flex items-center mt-1">
              <FaStar className="text-yellow-500" />
              <span className="text-black ml-1">{movie.vote_average}/10</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top Rated Movies */}
      <div className="flex justify-between items-center mt-10 mb-5">
        <h2 className="text-black text-2xl font-bold">Top Rated Movies</h2>
        <button
          onClick={() => router.push("/toprated")}
          className="text-white bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          See More
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {topRatedMovies.map((movie) => (
          <div key={movie.id} className="w-[200px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <h3 className="text-black text-lg mt-2">{movie.title}</h3>
            <div className="flex items-center mt-1">
              <FaStar className="text-yellow-500" />
              <span className="text-black ml-1">{movie.vote_average}/10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieComponent;
