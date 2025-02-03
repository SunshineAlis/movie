"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPopularMovies } from "@/utils/requests"; // ✅ getPopularMovies импортлох

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results || []);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    fetchMovies();
  }, [page]); // 🔥 page state өөрчлөгдөхөд дахин fetch хийнэ

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

      {/* Movies List */}
      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[200px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-[250px] h-[300px] object-cover rounded-lg"
            />
            <h3 className="text-black text-lg mt-2">{movie.title}</h3>
            <div className="flex items-center mt-1">
              <FaStar className="text-yellow-500" />
              <span className="text-black ml-1">{movie.vote_average}/10</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700 text-white"}`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {/* Show 1 to 5 pages */}
          {Array.from({ length: 5 }, (_, i) => {
            const pageNumber = i + 1;
            if (pageNumber > totalPages) return null; // Don't show more than total pages

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-2 rounded-lg ${pageNumber === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-400"}`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Show Ellipsis if there are more pages */}
          {totalPages > 5 && page < totalPages - 2 && (
            <>
              <span className="text-black">...</span>
              <button
                onClick={() => setPage(totalPages)}
                className={`px-3 py-2 rounded-lg ${page === totalPages ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-400"}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700 text-white"}`}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}
