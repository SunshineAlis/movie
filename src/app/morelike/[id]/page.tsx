"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import to get dynamic route params
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMoreLikeMovies } from "@/utils/requests"; // Function to fetch similar movies
import Link from "next/link";
import { Pagination } from "@/components/Pagination"; // Pagination component
import { Movie } from "@/types";

export default function MoreLike() {
  const params = useParams();

  // Ensure the ID is parsed correctly
  const id = params?.id as string;
  console.log("Params:", params); //

  console.log("Movie ID:", id);

  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]); //
  const [page, setPage] = useState<number>(1); //
  const [totalPages, setTotalPages] = useState<number>(1); //

  const fetchSimilarMovies = async () => {
    try {
      if (!id) return; // Ensure id is available
      const data = await getMoreLikeMovies(Number(id), page); //
      console.log("Similar Movies:", data); //
      setSimilarMovies(data.results); //
      setTotalPages(data.total_pages); //
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  useEffect(() => {
    fetchSimilarMovies(); //
  }, [id, page]); //

  return (
    <div className=" dark:text-white">
      <Header />
      <h1 className="text-2xl font-bold dark:text-white">More Like This</h1>

      {/* Similar Movies List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {similarMovies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="cursor-pointer w-[200px] dark:text-white">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <h3 className="text-black text-lg mt-2 dark:text-white">
                {movie.title}
              </h3>
              <div className="flex items-center mt-1">
                <FaStar className="text-yellow-500" />
                <span className="text-black ml-1 dark:text-white">
                  {movie.vote_average}/10
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        fetchData={setPage}
        totalPages={totalPages}
        // Pass the handler for page change
      />

      <Footer />
    </div>
  );
}
