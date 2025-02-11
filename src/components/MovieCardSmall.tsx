"use client";
import { useState, useEffect } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { Movie } from "@/types";
import { getMovieVideos, getPopularMovies } from "@/utils/requests";

export const MovieCardSmall = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<{ [key: number]: string | null }>({});
  const [activeTrailer, setActiveTrailer] = useState<number | null>(null);
  const [expandedOverview, setExpandedOverview] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        const moviesList = data.results || [];
        setMovies(moviesList);

        for (const movie of moviesList.slice(0, 10)) {
          try {
            const trailer = await getMovieVideos(movie.id);
            const trailerVideo = trailer.results?.find(
              (video: any) => video.key
            );

            setTrailer((prev) => ({
              ...prev,
              [movie.id]: trailerVideo?.key || null,
            }));
          } catch (error) {
            console.error("Failed to fetch trailer movies:", error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="w-[100%] max-w-[1200px] ">
      <Swiper
        navigation
        modules={[Navigation]}
        className="w-[90%] bg-white text-white"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}`} passHref>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="w-[100%] h-auto rounded-lg shadow-md"
              />
              <div className="mx-[3%]">
                <div className="flex items-center justify-between w-[100%] text-start my-[10px]">
                  <div className="flex flex-col gap-[2%] mx-[4%]">
                    <h3 className="text-sm w-[200px] text-black  ml-[10px] md:text-l">
                      Now Playing:
                    </h3>
                    <h3 className="text-l font-bold text-black truncate w-[90%] md:text-2xl">
                      {movie.title}
                    </h3>
                  </div>
                  <div className="flex items-center mt-2 mr-[3%] md:text-xl">
                    <FaStar className="text-yellow-500 text-xs md:text-xl" />
                    <p className="text-black text-xs mr-[3%] md:text-xl">
                      {movie.vote_average}
                      <span className="text-blue-400 mr-[3%]">/10</span>
                    </p>
                  </div>
                </div>
                <p className="text-black text-sm w-[320px] text-start m-[1%] mx-[10px] md:text-xl md:w-[500px]">
                  {expandedOverview[movie.id] || movie.overview.length < 100
                    ? movie.overview
                    : `${movie.overview.substring(0, 100)}... `}
                  {movie.overview.length >= 100 && (
                    <span
                      className="text-gray-700 justify-start text-start px-[10px] cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedOverview((prev) => ({
                          ...prev,
                          [movie.id]: !prev[movie.id],
                        }));
                      }}
                    >
                      {expandedOverview[movie.id]
                        ? "   Show Less"
                        : "Read more"}
                    </span>
                  )}
                </p>
                <div className="flex justify-start">
                  <button
                    className="bg-gray-100 text-black text-sm rounded flex items-center justify-start px-3 py-3 md:text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTrailer(
                        activeTrailer === movie.id ? null : movie.id
                      );
                    }}
                  >
                    <FaPlay className="mr-2" />
                    {activeTrailer === movie.id
                      ? "Close Trailer"
                      : "Watch Trailer"}
                  </button>
                </div>

                {activeTrailer === movie.id && trailer[movie.id] && (
                  <div className="w-full flex ">
                    <iframe
                      width="320"
                      height="180"
                      className="sm:w-[560px] sm:h-[315px] md:w-[640px] md:h-[360px]"
                      src={`https://www.youtube.com/embed/${trailer[movie.id]}`}
                      title="Movie Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
