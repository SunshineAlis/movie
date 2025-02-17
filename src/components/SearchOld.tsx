"use client";

import { Movie } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { FaArrowRight, FaSearch, FaStar } from "react-icons/fa";
import { getSearchMovies, getGenres } from "@/utils/requests";
import { Genre } from "@/types";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchOld() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();

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
      console.log(data);
      setMovies(data.results.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenre(genreId);
    router.push(`/Search/?genres=${genreId}`);
    setShowGenres(false);
  };

  // ?filer

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
        <div className="absolute py-4 left-0 w-[500px] bg-white shadow-md rounded-lg z-10 mt-2">
          {movies.length === 0 ? (
            <p className="px-4 py-2 text-sm text-gray-600">No results found</p>
          ) : (
            <div className="max-h-[300px] w-full overflow-y-auto">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative px-4 w-[100%] gap-4 cursor-pointer hover:bg-gray-200 flex flex-col items-center"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <div className="flex px-4 py-2 w-[100%]  items-center ">
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="w-[40px] h-[60px] object-cover rounded mr-2"
                      />
                    )}

                    <div className="py-4">
                      <span className="text-sm font-semibold">
                        {movie.title}
                      </span>
                      <div className="flex items-center px-2 gap-2">
                        <FaStar className="text-yellow-500" />
                        <p>
                          {movie.vote_average}
                          <span className="text-gray-500 ml-1">/10</span>
                        </p>
                      </div>
                      <p>{movie.release_date?.slice(0, 4)}</p>
                    </div>
                    <p className="flex items-center px-4 text-[15px] gap-2 absolute right-[20px] bottom-[20px] hover:underline">
                      See more
                      <FaArrowRight />
                    </p>
                  </div>
                  <div className="w-[98%] h-[1px] bg-gray-300 absolute top-[-15px]"></div>
                </div>
              ))}
            </div>
          )}
          <p
            className="py-2 px-4 cursor-pointer"
            onClick={() => router.push(`/Search`)}
          >
            See all results for "<strong>{searchQuery}</strong>"
          </p>
        </div>
      )}
    </div>
  );
}
