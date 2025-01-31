"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

const MovieComponent = ({ selectedCategory }: { selectedCategory?: string }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Popular Movies
        const popularRes = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=ed40c9caeaf1b576a8d758395b370665"
        );
        const popularData = await popularRes.json();
        if (popularData.results) {
          setPopularMovies(popularData.results.slice(0, 10));
        }

        // Upcoming Movies
        const upComRes = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=ed40c9caeaf1b576a8d758395b370665"
        );
        const upComData = await upComRes.json();
        if (upComData.results) {
          setUpComingMovies(upComData.results.slice(0, 10));
        }

        // Top Rated Movies
        const topRatedRes = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=ed40c9caeaf1b576a8d758395b370665"
        );
        const topRatedData = await topRatedRes.json();
        if (topRatedData.results) {
          setTopRatedMovies(topRatedData.results.slice(0, 10));
        }
      } catch (error) {
        console.error("Киноны мэдээлэл татахад алдаа гарлаа:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="w-full px-10 py-5 relative">
      {/* Upcoming Movies */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-black text-2xl font-bold">Upcoming Movies</h2>
        <button
          onClick={() => router.push("/movies/upcoming")}
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
          onClick={() => router.push("/movies/popular")}
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
          onClick={() => router.push("/movies/top-rated")}
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
