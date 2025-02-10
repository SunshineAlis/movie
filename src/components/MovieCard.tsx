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

export const MovieCard = () => {
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
    <div className="w-full h-[500px] sm:h-[700px] md:h-[600px] lg:h-[500px] relative">
      <Swiper navigation modules={[Navigation]} className="mySwiper">
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}`} passHref>
              <div>
                <div
                  className="w-full h-[500px] cursor-pointer bg-cover bg-center sm: "
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
                  }}
                ></div>

                <h3 className="text-white text-lg sm:text-xl text-black font-bold absolute top-[70px] left-[100px] sm:left-[20px] md:left-[40px]">
                  Now Playing:
                </h3>
                <h3 className="text-white text-3xl font-bold absolute top-[110px] left-[90px] ">
                  {movie.title}
                </h3>
                <div className="flex absolute top-[160px] left-[90px]">
                  <FaStar className="text-yellow-500 text-2xl" />
                  <span className="text-white text-lg ml-2">
                    {movie.vote_average}
                    <span className="text-gray-400 ml-[3px]">/10</span>
                  </span>
                </div>
                <p className="text-white text-l p-10 w-[450px] absolute top-[170px] left-[50px]">
                  {movie.overview}
                </p>

                <button
                  className="absolute bottom-[60px] left-[90px] p-2 bg-white text-black rounded flex items-center"
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

                {activeTrailer === movie.id && trailer[movie.id] && (
                  <div className="absolute bottom-10 left-10">
                    <iframe
                      width="560"
                      height="315"
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
