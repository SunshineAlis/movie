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
    <div className="w-full relative">
      <Swiper navigation modules={[Navigation]} className="mySwiper">
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}`} passHref>
              <div className=" h-[800px] h-[100%]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full max-h-[500px] h-[100%] rounded-lg"
                />
              </div>

              <div className="flex justify-between mr-[3%] ml-[3%] mt-[3%] mb-[1%]">
                <div className="flex flex-col text-black">
                  <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold ml-[10px]">
                    Now Playing:
                  </h3>
                  <h3 className="text-black text-xl sm:text-3xl md:text-4xl font-bold ">
                    {movie.title}
                  </h3>
                </div>
                <div className="flex">
                  <FaStar className="text-yellow-500  text-2xl" />
                  <p className="text-black text-lg ">
                    {movie.vote_average}
                    <span className="text-blue-400 ml-[3px]">/10</span>
                  </p>
                </div>
              </div>
              <p className="text-black text-l transition-all duration-300 mr-[5px] ml-[25px] mb-[10px]">
                {movie.overview}
                <span className="text-blue-500 cursor-pointer ml-2"></span>
              </p>
              <button
                className="bg-gray-100  p-[10px] ml-[20px] text-black text-sm rounded flex items-center z-10"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTrailer(
                    activeTrailer === movie.id ? null : movie.id
                  );
                }}
              >
                <FaPlay className="mr-2" />
                {activeTrailer === movie.id ? "Close Trailer" : "Watch Trailer"}
              </button>

              {activeTrailer === movie.id && trailer[movie.id] && (
                <div className="absolute bottom-10 sm:bottom-20 md:bottom-40 left-10 sm:left-20 md:left-40 z-10">
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
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
