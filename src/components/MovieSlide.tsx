"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import Link from "next/link";
import { Movie } from "@/types";
import { getMovieVideos, getPopularMovies } from "@/utils/requests";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const MovieComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<{ [key: number]: string | null }>({});
  const [activeTrailer, setActiveTrailer] = useState<number | null>(null);
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
            const trailerVideo = trailer.results?.find((video: any) => video.key);

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
    <div className="max-w-[1200px] w-[100%] h-[500px] mx-[20px] m-auto relative">
      <Carousel
        className="relative"
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}
            className="p-2 relative">
              <Link href={`/movie/${movie.id}`} passHref>
                <div>
                  <div
                    className="w-[100%] h-[500px] cursor-pointer text-center bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
                    }}
                  >
                  </div>

                  <h3 className="text-white text-lg sm:text-xl text-black font-bold absolute top-[110px] left-[180px] md:left-[200px]">
                    Now Playing:
                  </h3>
                  <h3 className="text-white text-3xl font-bold absolute top-[150px] left-[180px]">
                    {movie.title}
                  </h3>
                  <div className="flex absolute top-[190px] left-[180px]">
                    <FaStar className="text-yellow-500 text-2xl" />
                    <span className="text-white text-lg ml-2">
                      {movie.vote_average}
                      <span className="text-gray-400 ml-[3px]">/10</span>
                    </span>
                  </div>
                  <div>
                  <p className="text-white text-l p-10 w-[450px] absolute top-[190px] left-[160px] text-opacity:1">
                    {movie.overview}
                  </p>

                  <button
                    className="absolute bottom-[30px] left-[200px] p-2 bg-white text-black rounded flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTrailer(activeTrailer === movie.id ? null : movie.id);
                    }}
                  >
                    <FaPlay className="mr-2" />
                    {activeTrailer === movie.id ? "Close Trailer" : "Watch Trailer"}
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
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-5" />
        <CarouselNext className="right-5" />
      </Carousel>
    </div>
  );
};

export default MovieComponent;
