"use client";
import { useState, useEffect } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

const MovieComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<{ [key: number]: string | null }>({});
  const [activeTrailer, setActiveTrailer] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ed40c9caeaf1b576a8d758395b370665"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results.slice(0, 10));
          data.results.slice(0, 10).forEach((movie: Movie) => {
            fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=ed40c9caeaf1b576a8d758395b370665`
            )
              .then((res) => res.json())
              .then((videoData) => {
                const trailerVideo = videoData.results?.find(
                  (video: any) => video.key
                );
                setTrailer((prev) => ({
                  ...prev,
                  [movie.id]: trailerVideo?.key || null,
                }));
              })
              .catch((error) =>
                console.error("Видео татахад алдаа гарлаа:", error)
              );
          });
        }
      })
      .catch((error) =>
        console.error("Киноны мэдээлэл татахад алдаа гарлаа:", error)
      );
  }, []);

  return (
    <div className="w-full h-[500px]">
      <Swiper navigation modules={[Navigation]} className="mySwiper">
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}`} passHref>
              <div
                className="w-full h-[500px] cursor-pointer bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
                }}
              >
                <h3 className="text-white text-xl font-bold absolute top-[70px] left-[90px]">
                  Now Playing:
                </h3>
                <h3 className="text-white text-3xl font-bold absolute top-[110px] left-[90px]">
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
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieComponent;
