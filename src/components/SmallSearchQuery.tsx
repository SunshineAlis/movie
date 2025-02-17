"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFetchGenre, getGenres, getSearchMovies } from "@/utils/requests";
import { FaStar, FaSearch, FaArrowRight } from "react-icons/fa";
import Footer from "@/components/Footer";
import Arrow from "@/components/Arrow";
import { Movie } from "@/types";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DynamicPagination } from "@/components/DynamicPagination";
import Genre from "@/components/Genre";
import { ChevronDown, ChevronRight, SearchIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Genre = {
  id: number;
  name: string;
  title: string;
  release_date?: string;
  poster_path?: string;
  page: number;
}

const SmallSearchQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const { theme, setTheme } = useTheme();
  const searchQuery = searchParams?.get("query") || "";
  const pageQuery = searchParams?.get("page");

  const currentPage = pageQuery ? Number(pageQuery) : 1;

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [query, setQuery] = useState<string>(searchQuery);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();

  const [showGenres, setShowGenres] = useState(false);


  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);



  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (query.trim()) {
          data = await getSearchMovies(query);
          const filteredMovies = data.results.filter((movie: Movie) =>
            selectedGenres.length ? movie.genre_ids.some((id) => selectedGenres.includes(id))
              : true
          );
          setMovies(filteredMovies);
        } else {
          data = await getFetchGenre(selectedGenres, currentPage);
          setMovies(data.results || []);
        }

        setMovies(data.results || []);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenres, query,]);

  useEffect(() => {
    const genreQuery = searchParams?.get("genres");
    setSelectedGenres(genreQuery ? genreQuery.split(",").map(Number) : []);
  }, []);

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId) ? prevGenres.filter((id) => id !== genreId) : [...prevGenres, genreId]
    );
  };
  const genreSelect = (genreId: number) => {
    setSelectedGenre(genreId);
    router.push(`/category/?genres=${genreId}`);
    setShowGenres(false);
  };

  if (loading) return <div>Loading...</div>;

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
                        onClick={() => genreSelect(genre.id)}
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="ml-2 flex-grow w-full bg-white outline-none focus:ring-0 focus:outline-none autofill:bg-transparent"
                />
              </div>
              <X
                className="text-gray-900 text-3xl absolute right-[5px] bottom-[15px] cursor-pointer mx-2"
                onClick={() => {
                  setIsOpen(false);
                  setShowGenres(false);
                  setQuery("");
                }}
              />
            </div>
          </div>
          </motion.div>
        )}
          <h1 className="text-xl mx-8 font-bold mb-4 dark:text-white">{totalResults} results for"<strong>{query}</strong>"</h1>

  <div className="w-[100%] mx-4">
          {movies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 dark:text-white">
              {movies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  <li className="mb-4 cursor-pointer">
                    {movie.backdrop_path ? (
                      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="object-cover h-60 rounded-lg" />
                    ) : (
                      <div className="bg-gray-300 rounded-lg flex items-center justify-center">
                        <p>No Image Available</p>
                      </div>
                    )}
                    <h3 className="text-black text-sm truncate md:text-lg lg:text-xl dark:text-white">{movie.title}</h3>
                    <div className="flex items-center mt-1 dark:text-white">
                      <FaStar className="text-yellow-500" />
                      <span className="text-black ml-1 dark:text-white">{movie.vote_average}/10</span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
</div>
        <div className="w-[100%] mx-4 dark:text-white">
          <h1 className="font-bold text-lg mb-[10px] ml-[30px]">Search Filter</h1>
          <div className="mt-2">
            <div className="left-0 p-4 w-full mx-[10px]">
              <h2 className="font-bold text-xl mb-2">Genres</h2>
              <p className="font-bold text-sm mb-2">Filter movies by genre</p>
              <div className="w-full h-[2px] border-2 mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre.id)}
                    className={`p-2 rounded flex items-center font-bold text-[10px] border hover:bg-gray-200 md:text-xs ${
                      selectedGenres.includes(genre.id) ? "bg-gray-300" : ""
                    }`}
                  >
                    {genre.name}
                    <Arrow />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
          

      {totalPages && (
        <DynamicPagination total_page={totalPages} />
      )}

      <Footer />
    </div>









    //     <div>
    //       {/* <Header /> */}
    //       <div className="max-w-[1200px] w-[100%] bg-white m-auto flex items-center justify-between gap-2 py-2 pt-4 dark:bg-gray-900">
    //           <div
    //             className="flex items-center mx-2 px-2 w-[200px] cursor-pointer"
    //             onClick={() => router.push("/")}
    //           >
    //             <MovieLogo width={30} height={30} className="text-[#4338CA]" />
    //             <p className="text-[8px] w-20 lg:mb-[5px] text-xl font-semibold italic text-[#4338CA] dark:text-white">
    //               Movie Z
    //             </p>
    //           </div>

    //           <div className="flex items-center gap-[10%] ">
    //             <Genre />
    //            {/* input */}
    //            <div className="border rounded-2xl relative">
    //             <input
    //               type="text"
    //               value={query}
    //               onChange={(e) => setQuery(e.target.value)}
    //               placeholder="Search movies..."
    //               className="pl-10 h-10 w-300 text-gray-900 dark:text-white"
    //             />
    //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
    //           </div>
    //           </div>
    // {/* theme */}
    //           <div className="px-2">
    //             <Button
    //               variant="outline"
    //               size="icon"
    //               className="flex z-10"
    //               onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    //             >
    //               {theme === "light" ? (
    //                 <Moon className="h-[1.2rem] w-[1.2rem]" />
    //               ) : (
    //                 <Sun className="h-[1.2rem] w-[1.2rem]" />
    //               )}
    //               <span className="sr-only">Toggle theme</span>
    //             </Button>
    //           </div>
    // </div>


    //  {/* next */}
    // <h1 className="text-xl mx-8 font-bold mb-4 dark:text-white">{totalResults} results for"<strong>{query}</strong>"</h1>
    // <div className="flex w-[100%] max-w-[1200px] m-auto ml-10">
    //   <div className="w-[70%]">
    //           {movies.length === 0 ? (
    //             <p>No movies found.</p>
    //           ) : (
    //             <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 dark:text-white">
    //               {movies.map((movie) => (
    //                 <Link key={movie.id} href={`/movie/${movie.id}`}>
    //                   <li className="mb-4 cursor-pointer">
    //                     {movie.backdrop_path ? (
    //                       <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="object-cover h-60 rounded-lg" />
    //                     ) : (
    //                       <div className="bg-gray-300 rounded-lg flex items-center justify-center">
    //                         <p>No Image Available</p>
    //                       </div>
    //                     )}
    //                     <h3 className="text-black text-sm truncate md:text-lg lg:text-xl dark:text-white">{movie.title}</h3>
    //                     <div className="flex items-center mt-1 dark:text-white">
    //                       <FaStar className="text-yellow-500" />
    //                       <span className="text-black ml-1 dark:text-white">{movie.vote_average}/10</span>
    //                     </div>
    //                   </li>
    //                 </Link>
    //               ))}
    //             </ul>
    //           )}
    // </div>
    //         <div className="w-[30%] mr-4 dark:text-white">
    //           <h1 className="font-bold text-lg mb-[10px] ml-[30px]">Search Filter</h1>
    //           <div className="mt-2">
    //             <div className="left-0 p-4 w-full mx-[10px]">
    //               <h2 className="font-bold text-xl mb-2">Genres</h2>
    //               <p className="font-bold text-sm mb-2">Filter movies by genre</p>
    //               <div className="w-full h-[2px] border-2 mb-2"></div>
    //               <div className="flex flex-wrap gap-2">
    //                 {genres.map((genre) => (
    //                   <button
    //                     key={genre.id}
    //                     onClick={() => handleGenreSelect(genre.id)}
    //                     className={`p-2 rounded flex items-center font-bold text-[10px] border hover:bg-gray-200 md:text-xs ${
    //                       selectedGenres.includes(genre.id) ? "bg-gray-300" : ""
    //                     }`}
    //                   >
    //                     {genre.name}
    //                     <Arrow />
    //                   </button>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //           </div>

    // {/* pagination */}
    // {totalPages && (
    //               <DynamicPagination total_page={totalPages} />
    //             )}

    //       <Footer />
    //     </div>
  );
};

export default SmallSearchQuery;
