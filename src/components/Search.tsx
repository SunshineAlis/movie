"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaArrowRight, FaStar } from "react-icons/fa";
import { Movie, Genre } from "@/types";
import { getSearchMovies, getGenres } from "@/utils/requests";
import { ChevronDown, ChevronRight, SearchIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const { theme, setTheme } = useTheme();

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

  const searchMovies = async (query: string) => {
    try {
      const data = await getSearchMovies(query);
      setMovies(data.results.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenre(genreId);
    router.push(`/category/?genres=${genreId}`);
  };

  return (

    <div className="relative w-full sm:w-[400px]">
      <div className="bg-white  flex items-center justify-between gap-2 py-4 dark:bg-gray-900">
        {/* logo */}
        {!isOpen && (
          <div
            className="flex items-center ml-[3%] w-[200px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <MovieLogo width={30} height={30} className="text-[#4338CA]" />
            <p className="text-[8px] font-semibold italic text-[#4338CA] sm:text-sm md: text-lg  dark:text-white">
              Movie Z
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {/* searchINput */}
          <div className="relative">
            {/* Search Button */}
            {!isOpen && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="border-2 bg-white h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
              >
                <FaSearch className="text-gray-600" />
              </button>
            )}

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-[-10px] left-[20px] bg-white rounded-md p-2 w-[300px] shadow-lg z-10"
              >
                <div className="flex gap-[3px]">
                  {/* genreheseg */}
                  <div className="flex gap-[3px]">
                    <button
                      onClick={() => setShowGenres(!showGenres)} // T
                      className="border-2 bg-white h-10 w-10 rounded-lg flex flex-col items-center justify-between px-4 hover:bg-gray-100 transition"
                    >
                      <ChevronDown className="text-gray-600 text-xl my-2" />
                    </button>

                    {showGenres && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showGenres ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-100 px-3 absolute top-[30px] left-[20px] z-[10] rounded-md w-[310px] mx-2 py-4 my-4"
                      >
                        <h2 className="font-bold text-xl text-black">Genres</h2>
                        <p className="text-sm text-gray-700">
                          See lists of movies by genre
                        </p>
                        <div className="border-b-2 my-2"></div>
                        <div className="flex flex-wrap gap-2">
                          {genres.map((genre) => (
                            <button
                              key={genre.id}
                              onClick={() => handleGenreSelect(genre.id)}
                              className="w-fit flex items-center pl-2 truncate rounded-xl text-sm border-2 hover:bg-gray-200 text-black text-center"
                            >
                              {genre.name}
                              <ChevronRight />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* searchinput */}
                  <div className=" ">
                    <div className="relative flex items-center border-2 border-gray-300 rounded-md h-[40px] focus-within:ring-2 focus-within:ring-blue-500 shadow-sm transition px-2">
                      <SearchIcon className="text-gray-500 text-3xl mx-2" />
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="ml-2 flex-grow w-full bg-white outline-none focus:ring-0 focus:outline-none autofill:bg-transparent"
                      />
                    </div>
                    <X
                      className="text-gray-900 text-3xl absolute right-[5px] bottom-[15px] cursor-pointer mx-2"
                      onClick={() => {
                        setIsOpen(false);
                        setShowGenres(false);
                        setSearchQuery("");
                      }}
                    />
                  </div>
                </div>
                {searchQuery && (
                  <div className="absolute py-4 left-[10px] w-[250px] bg-white shadow-md rounded-lg z-10 mt-2 md:w-[350px]">
                    {movies.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-gray-600">
                        No results found
                      </p>
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
                                    <span className="text-gray-500 ml-1">
                                      /10
                                    </span>
                                  </p>
                                </div>
                                <p>{movie.release_date?.slice(0, 4)}</p>
                              </div>
                              <p className="flex items-center px-4 text-[10px] gap-2 absolute right-[20px] bottom-[20px] md:text-[14px] hover:underline">
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
                      See all results for <strong>{searchQuery}</strong>
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* theme */}
          {!isOpen && (
            <Button
              variant="outline"
              size="icon"
              className="flex z-10"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
