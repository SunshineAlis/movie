"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { Movie } from "@/types";
import { getMovieVideos, getPopularMovies } from "@/utils/requests";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";


export const MovieCardSmall = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<{ [key: number]: string | null }>({});
  const [activeTrailer, setActiveTrailer] = useState<number | null>(null);
  const [expandedOverview, setExpandedOverview] = useState<{
    [key: number]: boolean;
  }>({});
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

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
    <div className="w-full max-w-[1200px] mx-auto">
      <Carousel
        className="relative h-[250px] md:h-[450px]"
        plugins={[autoplay.current]}>
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <Link href={`/movie/${movie.id}`} passHref>
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg ml-[10px] md:mx-[20px] sm:mx-[20px]"
                  />
                  <div className="m-[10px] mx-[20px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">Now Playing:</h3>
                        <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                      </div>
                      <div className="flex items-center mt-2">
                        <FaStar className="text-yellow-500" />
                        <p className="ml-1 text-gray-700">
                          {movie.vote_average} <span className="text-blue-400">/10</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      {expandedOverview[movie.id] || movie.overview.length < 100
                        ? movie.overview
                        : `${movie.overview.substring(0, 100)}... `}
                      {movie.overview.length >= 100 && (
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedOverview((prev) => ({
                              ...prev,
                              [movie.id]: !prev[movie.id],
                            }));
                          }}
                        >
                          {expandedOverview[movie.id] ? " Show Less" : " Read more"}
                        </span>
                      )}
                    </p>
                    <button
                      className="mt-2 bg-gray-100 text-black text-sm rounded px-3 py-2 flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTrailer(activeTrailer === movie.id ? null : movie.id);
                      }}
                    >
                      <FaPlay className="mr-2" />
                      {activeTrailer === movie.id ? "Close Trailer" : "Watch Trailer"}
                    </button>
                    {activeTrailer === movie.id && trailer[movie.id] && (
                      <div className="mt-4">
                        <iframe
                          width="100%"
                          height="200"
                          className="rounded-lg"
                          src={`https://www.youtube.com/embed/${trailer[movie.id]}`}
                          title="Movie Trailer"
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-8" />
        <CarouselNext className="right-6" />
      </Carousel>
    </div>
  );
};




