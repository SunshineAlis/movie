import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

const MovieListPage = ({ apiUrl, title }: { apiUrl: string; title: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchMovies();
  }, [apiUrl]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
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
      <button
        onClick={() => router.push("/")}
        className="text-white bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700 mt-4"
      >
        Back to Home
      </button>
    </div>
  );
};

export default MovieListPage;