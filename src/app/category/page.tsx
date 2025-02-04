"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getFetchGenre, getGenres } from "@/utils/requests";
import Arrow from "@/components/Arrow";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Pagination } from "@/components/Pagination";

interface Genre {
  id: number;
  name: string;
}

const CategoryPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const genreQuery = searchParams?.get("genres");

  const params = useParams<{ genreId: string }>();
  const { genreId } = params || {};

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [genreMovies, setGenreMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0); //
  const [page, setPage] = useState<number>(1); // Track current page
  const [totalPages, setTotalPages] = useState<number>(1); // Track total pages

  useEffect(() => {
    if (genreQuery) {
      const genresArray = genreQuery.split(",").map(Number);
      setSelectedGenres(genresArray);
    }
  }, [genreQuery]);
  const fetchGenreMovies = async () => {
    try {
      const data = await getFetchGenre(selectedGenres, page);
      console.log("API Response:", data);

      if (data.success === false) {
        console.error("TMDB API Error:", data.status_message);
      } else {
        setGenreMovies(data.results || []);
        setTotalResults(data.total_results); // Set total results
        setTotalPages(data.total_pages); // Set total pages
      }
    } catch (error) {
      console.error("Error fetching genre movies:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedGenres.length > 0) {
      fetchGenreMovies();
    } else {
      setLoading(false);
      setGenreMovies([]);
    }
  }, [selectedGenres, page]);

  // Fetch genres for the filter
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

  const handleGenreSelect = (genreId: number) => {
    let updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    console.log("Updated Genres:", updatedGenres);

    router.push(`/category?genres=${updatedGenres.join(",")}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="flex mt-[50px] mb-[30px] ml-[10px]">
        <div>
          <h1 className="font-bold text-2xl mb-[30px] ml-[20px]">
            Search Filter
          </h1>
          <div className="mt-2">
            <div className="left-0 p-4 w-[400px]">
              <h2 className="font-bold text-2xl mb-2">Genres</h2>
              <p className="font-bold text-l mb-2">
                See lists of movies by genre
              </p>
              <div className="w-full h-[2px] border-2 mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre.id)}
                    className={`p-2 rounded flex items-center font-bold text-xs border hover:bg-gray-200 ${
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
          <h1 className="text-xl font-bold mb-4">{totalResults} Titles</h1>
          <div className="mr-[50px]">
            {genreMovies.length === 0 ? (
              <p>No movies found for the selected genres.</p>
            ) : (
              <ul className="grid grid-cols-4 gap-6">
                {genreMovies.map((movie) => (
                  <li key={movie.id} className="mb-4">
                    {movie.backdrop_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-[300px] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-[300px] bg-gray-300 rounded-lg flex items-center justify-center">
                        <p>No Image Available</p>
                      </div>
                    )}
                    <h3 className="text-black text-lg mt-2">{movie.title}</h3>
                    <div className="flex items-center mt-1">
                      <FaStar className="text-yellow-500" />
                      <span className="text-black ml-1">
                        {movie.vote_average}/10
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Pagination fetchData={fetchGenreMovies} totalPages={totalPages} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
