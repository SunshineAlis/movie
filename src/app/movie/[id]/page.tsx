"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getFetchMovie,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "@/utils/requests";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaStar } from "react-icons/fa";

const MovieDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const [movie, setMovie] = useState<any>(null);
  const [director, setDirector] = useState<string | null>(null);
  const [writers, setWriters] = useState<string | null>(null);
  const [stars, setStars] = useState<string[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  // Utility function for runtime conversion
  const convertRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        // Киноны мэдээллийг авна
        const data = await getFetchMovie(Number(id));
        setMovie(data);

        // Киноны ажилтнуудыг (Director, Writer) авах
        const credits = await getMovieCredits(Number(id));

        // Director болон Writers мэдээллийг авах
        const directorData = credits.director; //
        const writersData = credits.writers; //

        // Director-ийн нэрийг state-д хадгалах
        setDirector(directorData || "Unknown");

        //
        setWriters(writersData || "Unknown");

        // Тоглогчдыг авна
        const actors = credits.cast.slice(0, 5).map((actor: any) => actor.name);
        setStars(actors);

        const similar = await getSimilarMovies(Number(id));
        setSimilarMovies(similar.slice(0, 5));

        // Киноны трейлерийг авна
        const videoData = await getMovieVideos(Number(id));
        const trailerVideo = videoData.results?.find(
          (video: any) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerKey(trailerVideo ? trailerVideo.key : null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const formatVoteCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M"; // For millions
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k"; // For thousands
    }
    return count.toString(); // If less than 1000, just return the number
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="w-[1200px] w-[100%] m-auto">
      <Header />
      <div className="mr-[10px] ml-[50px] flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <div className="flex items-center gap-[5px]">
              <h2 className=" text-xl">{movie.release_date} </h2>
              <p className="w-[4px] h-[4px] rounded-full bg-black "></p>
              <h2 className=" text-xl">PG</h2>
              <p className="w-[4px] h-[4px] rounded-full bg-black"></p>
              <h2 className=" text-xl">{convertRuntime(movie.runtime)}</h2>
            </div>
          </div>
          <div>
            <strong className="ml-[15px]">Rating:</strong>
            <div className="flex items-center gap-[10px]">
              <FaStar className="text-yellow-500 text-4xl" />
              <div>
                <p>
                  {" "}
                  {movie.vote_average}{" "}
                  <span className="text-blue-600">/10</span>
                </p>
                <p className="text-center">
                  {formatVoteCount(movie.vote_count)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 gap-6 w-full mr-[50px] ml-[20px]">
          {/* Кино постер */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-[20%] h-[400px] rounded-lg"
          />

          {/* 🎥 Трейлер */}
          {trailerKey && (
            <div className="flex-1">
              <iframe
                className="w-[100%] h-[400px] rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>{" "}
        <div className="flex gap-4 flex-wrap mt-2">
          {movie.genres.map((genre: any) => (
            <span
              key={genre.id}
              className=" bg-white border text-black py-1 px-5 rounded-2xl text-xs font-bold"
            >
              {genre.name}
            </span>
          ))}

          <div className="flex flex-col gap-[10px]">
            <p className="text-lg">{movie.overview}</p>
            <div className="flex ">
              <strong>Director:</strong>
              <p className="ml-[50px]">{director}</p>
            </div>
            <p className="w-[99%] flex items-center h-[2px] border "></p>
            <div className="flex ">
              <strong>Writers:</strong>
              <p className="ml-[55px]">{writers}</p>
            </div>
            <p className="w-[99%] flex items-center h-[2px] border "></p>
            <div className="flex">
              <strong>Stars:</strong>
              <p className="ml-[69px] flex gap-[10px]">
                {stars.map((star, index) => (
                  <p key={index} className="flex items-center gap-[5px]">
                    {star}{" "}
                    <p className="w-[5px] h-[5px] rounded-full bg-black m-[5px]"></p>
                  </p>
                ))}
              </p>
            </div>
            <p className="w-[99%] flex items-center h-[2px] border "></p>
          </div>
          <div className="w-[100%]">
            <div className="flex justify-between ">
              <h3 className="text-2xl font-bold mt-3">More Like This</h3>
              <button
                // onClick={() => router.push(path)}
                className="text-white bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                See More
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-4">
              {similarMovies.map((similarMovie) => (
                <Link key={similarMovie.id} href={`/movie/${similarMovie.id}`}>
                  <div className="w-[200px] cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                      alt={similarMovie.title}
                      className="w-[200px] h-[300px] object-cover rounded-lg"
                    />
                    <h4 className="text-lg mt-2">{similarMovie.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MovieDetail;
