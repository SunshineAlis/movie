"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaSearch } from "react-icons/fa";
import { getGenres } from "../utils/requests";
import DownArrow from "./DownArrow";
import RightArrow from "./Arrow";

interface Genre {
  id: number;
  name: string;
  title: string;
  release_date?: string;
  poster_path?: string;
}

interface Movie {
  id: number;
  name: string;
  title: string;
  release_date?: string;
  poster_path?: string;
}

export default function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>(""); //
  const [movies, setMovies] = useState<Movie[]>([]); //
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch genres
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

  const toggleGenreList = () => {
    setShowGenres(!showGenres);
  };

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenre(genreId);
    router.push(`/category/?genres=${genreId}`);
  };

  // Fetch movies based on search query
  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setMovies([]); //
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en&api_key=ed40c9caeaf1b576a8d758395b370665&page`
      );
      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // In case of error
    }
  };

  // Handle search query change and fetch movies
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchMovies(value);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <MovieLogo width={30} height={30} className="text-[#4338CA]" />
          <p className="mb-[5px] text-xl font-semibold italic text-[#4338CA] dark:text-white">
            Movie Z
          </p>
        </div>
        <div className="flex items-center gap-[1px]">
          <div className="flex flex-col items-center ">
            {/* Genre button */}
            <button
              className="w-[120px] text-black font-bold flex items-center gap-[10px] border ml-[-250px] p-2 rounded"
              onClick={toggleGenreList}
            >
              <DownArrow className="text-black font-bold ml-[10px]" />
              {showGenres ? "Genres " : "Genres"}

              {showGenres && (
                <div className="relative z-[999] mt-[40px] ml-[105px]">
                  <div className="flex flex-wrap gap-2 mt-2 w-[400px] pb-[10px] absolute left-[-200px] bg-white shadow-lg rounded-lg border z-[1000]">
                    <div className="flex flex-col w-[400px] items-center">
                      <h2 className="font-bold mr-[300px] mt-[20px] text-2xl">
                        Genres
                      </h2>
                      <p className="font-bold mr-[150px] mt-[10px] text-l">
                        See lists of movies by genre
                      </p>
                      <div className="w-[380px] h-[2px] border-2 mt-[5px]" />
                    </div>
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreSelect(genre.id)}
                        className="p-2 rounded flex items-center ml-[10px] mb-[2px] font-bold text-xs border hover:bg-gray-200"
                      >
                        {genre.name}
                        <RightArrow />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Search input */}
          <div className="border rounded-lg relative">
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="pl-10 text-gray-900 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Display search results */}
          {searchQuery && movies.length > 0 && (
            <div className="absolute mt-2 w-full bg-white shadow-md rounded-lg z-10">
              <div className="max-h-[300px] overflow-y-auto">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => router.push(`/movie/${movie.id}`)}
                  >
                    <div className="flex items-center">
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w50${movie.poster_path}`}
                          alt={movie.title}
                          className="w-12 h-18 object-cover rounded mr-2"
                        />
                      )}
                      <span className="text-sm font-semibold">
                        {movie.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item onClick={() => setTheme("light")}>
                Light
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}
