"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Movie } from "@/types";
import { getSearchMovies } from "@/utils/requests";
import { Button } from "./ui/button";

export const SearchInput = ({
  setIsActiveSearch,
  isActiveSearch,
}: {
  isActiveSearch: boolean;
  setIsActiveSearch: (_isActiveSearch: boolean) => void;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showButton, setShowButton] = useState(false);

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

  const handleClick = () => {
    setIsActiveSearch(true);
    setShowButton(true); // Show the button when the search icon is clicked
  };

  return (
    <div className="relative w-full sm:w-[400px]">
      {/* Search input */}
      <div className="flex items-center gap-[10px] border px-3 py-3 rounded-md">
        <FaSearch
          onClick={handleClick}
          className="cursor-pointer text-gray-500"
        />
        <Input
          value={searchQuery}
          size={16}
          onClick={handleClick}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className={`h-7 border-0 outline-none rounded-none ${
            isActiveSearch ? "block" : "hidden"
          } transition-all duration-300  absolute right-[100px] ease-in-out w-[100px] border focus:w-[200px]`} // Width changes on focus
        />
      </div>

      {/* Display search results */}
      {searchQuery && (
        <div className="absolute right-[4px] w-full bg-white shadow-md rounded-lg z-10 mt-2">
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
};
