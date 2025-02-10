"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Movie } from "@/types";
import { getSearchMovies } from "@/utils/requests";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const searchMovies = async (query: string) => {
    try {
      const data = await getSearchMovies(query);
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="relative w-[400px]">
      {/* Search input */}
      <div className="border rounded-lg relative">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="pl-10 text-gray-900 dark:text-white"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </div>

      {/* Display search results */}
      {searchQuery && (
        <div className="absolute left-0 w-full bg-white shadow-md rounded-lg z-10 mt-2">
          {movies.length === 0 ? (
            <p className="px-4 py-2 text-sm text-gray-600">No results found</p>
          ) : (
            <div className="max-h-[300px] overflow-y-auto">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-[40px] h-[60px] object-cover rounded mr-2"
                    />
                  )}
                  <span className="text-sm font-semibold">{movie.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
