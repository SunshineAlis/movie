"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFetchGenre, getGenres } from "@/utils/requests";
import Arrow from "@/components/Arrow";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Genre } from "@/types";
import { DynamicPagination } from "@/components/DynamicPagination";

const CategoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreQuery = searchParams?.get("genres");
  const selectedGenres = genreQuery ? genreQuery.split(",").map(Number) : [];

  const pageQuery = searchParams?.get("page");
  const currentPage = pageQuery ? Number(pageQuery) : 1;

  const [loading, setLoading] = useState(true);
  const [genreMovies, setGenreMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number | undefined>(0);

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

  const fetchGenreMovies = async () => {
    if (selectedGenres.length === 0) {
      setGenreMovies([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getFetchGenre(selectedGenres, currentPage);
      console.log("Fetched movies for page:", currentPage, data);

      if (data.success === false) {
        console.error("TMDB API Error:", data.status_message);
      } else {
        setGenreMovies(data.results || []);
        setTotalResults(data.total_results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching genre movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenreMovies();
  }, [searchParams]); //
  const handleGenreSelect = (genreId: number) => {
    let updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    console.log("Updated Genres:", updatedGenres);
    router.push(`/category?genres=${updatedGenres.join(",")}&page=1`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="flex  max-w-[1200px] w-[100%] m-auto dark:text-white">
        <div className="w-[50%] ">
          <h1 className="font-bold text-lx mb-[10px] ml-[30px]">
            Search Filter
          </h1>
          <div className="mt-2">
            <div className="left-0 p-4 w-full mx-[10px]">
              <h2 className="font-bold text-xl mb-2">Genres</h2>
              <p className="font-bold text-sx mb-2">
                See lists of movies by genre
              </p>
              <div className="w-full h-[2px] border-2 mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre.id)}
                    className={`p-2 rounded flex items-center font-bold text-[8px] border hover:bg-gray-200 md:text-xs ${
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

        <div className="ml-4">
          <h1 className="text-xl font-bold mb-4 dark:text-white">
            {totalResults} Titles
          </h1>
          <div className="">
            {genreMovies.length === 0 ? (
              <p>No movies found for the selected genres.</p>
            ) : (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 dark:text-white">
                {genreMovies.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <li className="mb-4 cursor-pointer">
                      {movie.backdrop_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                          alt={movie.title}
                          className="object-cover h-60 rounded-lg"
                        />
                      ) : (
                        <div className="bg-gray-300 rounded-lg flex items-center justify-center">
                          <p>No Image Available</p>
                        </div>
                      )}
                      <h3 className="text-black text-sx truncate md:text-lx lg:text-2xl dark:text-white">
                        {movie.title}
                      </h3>
                      <div className="flex items-center mt-1 dark:text-white">
                        <FaStar className="text-yellow-500" />
                        <span className="text-black ml-1 dark:text-white">
                          {movie.vote_average}/10
                        </span>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}

            {/* DynamicPagination component */}
            {totalPages && <DynamicPagination total_page={totalPages} />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
