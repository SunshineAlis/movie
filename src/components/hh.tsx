"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFetchGenre, getGenres, getSearchMovies } from "@/utils/requests";
import Arrow from "@/components/Arrow";
import { FaStar } from "react-icons/fa";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Movie } from "@/types";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DynamicPagination } from "@/components/DynamicPagination";
import Genre from "@/components/Genre";
import SmallSearchQuery from "@/components/SmallSearchQuery";

type Genre = {
  id: number;
  name: string;
};

const SearchGenre = () => {
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth >= 375 && window.innerWidth <= 750);
      };
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

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
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (query.trim()) {
          data = await getSearchMovies(query);
          const filteredMovies = data.results.filter((movie: Movie) =>
            selectedGenres.length ? movie.genre_ids.some((id) => selectedGenres.includes(id)) : true
          );
          setMovies(filteredMovies);
        } else {
          data = await getFetchGenre(selectedGenres, currentPage);
          setMovies(data.results || []);
        }

        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenres, query, currentPage]);

  useEffect(() => {
    const genreQuery = searchParams?.get("genres");
    setSelectedGenres(genreQuery ? genreQuery.split(",").map(Number) : []);
  }, [searchParams]);

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId) ? prevGenres.filter((id) => id !== genreId) : [...prevGenres, genreId]
    );
  };

  if (loading) return <div>Loading...</div>;

  return isMobile ? (
    <SmallSearchQuery />
  ) : (
    <div>
      <div className="max-w-[1200px] w-[100%] bg-white m-auto flex items-center justify-between py-2 dark:bg-gray-900">
        <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}> 
          <MovieLogo width={30} height={30} className="text-[#4338CA]" />
          <p className="text-xl font-semibold italic text-[#4338CA] dark:text-white">Movie Z</p>
        </div>

        <div className="flex items-center gap-4">
          <Genre />
          <div className="border rounded-2xl relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="pl-10 h-10 text-gray-900 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      <h1 className="text-xl mx-8 font-bold mb-4 dark:text-white">{totalResults} results for "<strong>{query}</strong>"</h1>

      {totalPages && <DynamicPagination total_page={totalPages} />}

      <Footer />
    </div>
  );
};

export default SearchGenre;
