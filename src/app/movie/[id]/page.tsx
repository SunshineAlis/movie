"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import {
  getFetchMovie,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "@/utils/requests";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const MovieDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const [movie, setMovie] = useState<any>(null);
  const [director, setDirector] = useState<string>("Unknown");
  const [writers, setWriters] = useState<string>("Unknown");
  const [stars, setStars] = useState<string[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        const data = await getFetchMovie(Number(id));
        setMovie(data);

        const credits = await getMovieCredits(Number(id));
        setDirector(
          credits.crew.find((member: any) => member.job === "Director")?.name || "Unknown"
        );
        setWriters(
          credits.crew
            .filter((member: any) => member.job === "Writer")
            .map((writer: any) => writer.name)
            .join(", ") || "Unknown"
        );
        setStars(credits.cast?.slice(0, 5).map((actor: any) => actor.name) || []);

        const similar = await getSimilarMovies(Number(id));
        setSimilarMovies(similar.slice(0, 5));

        const videoData = await getMovieVideos(Number(id));
        const trailerVideo = videoData.results?.find(
          (video: any) => video.type.toLowerCase() === "trailer" && video.site === "youTube"
        );
        setTrailerKey(trailerVideo ? trailerVideo.key : null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const convertRuntime = (minutes: number) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  const formatVoteCount = (count: number) =>
    count >= 1_000_000 ? (count / 1_000_000).toFixed(1) + "M" : count >= 1_000 ? (count / 1_000).toFixed(1) + "k" : count.toString();

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-[1200px] mx-auto dark:text-white">
      <Header />
      <div className="mr-10 ml-12 flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold dark:text-white">{movie.title}</h2>
            <div className="flex items-center gap-2 text-xl">
              <h2>{movie.release_date}</h2>
              <span className="w-1 h-1 bg-black rounded-full dark:text-white"></span>
              <h2>PG</h2>
              <span className="w-1 h-1 bg-black rounded-full dark:text-white"></span>
              <h2>{convertRuntime(movie.runtime)}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 dark:text-white">
            <FaStar className="text-yellow-500 text-4xl " />
            <div>
              <p>{movie.vote_average} <span className="text-blue-600 dark:text-white">/10</span></p>
              <p className="text-center dark:text-white">{formatVoteCount(movie.vote_count)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 w-full dark:text-white">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-1/5 h-96 rounded-lg" />
          {trailerKey && (
            <iframe className="w-full h-96 rounded-lg" src={`https://www.youtube.com/embed/${trailerKey}`} allowFullScreen></iframe>
          )}
        </div>
        <div className="flex flex-wrap gap-4 ">
          {movie.genres.map((genre: any) => (
            <span key={genre.id} className="bg-white border text-black py-1 px-5 rounded-2xl text-xs font-bold">{genre.name}</span>
          ))}
        </div>
        <p className="text-lg dark:text-white">{movie.overview}</p>
        <div className="space-y-2 dark:text-white">
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Writers:</strong> {writers}</p>
          <p><strong>Stars:</strong> {stars.join(", ")}</p>
        </div>
        <div className="w-full dark:text-white">
          <div className="flex justify-between dark:text-white">
            <h3 className="text-2xl font-bold mt-3 dark:text-white">More Like This</h3>
            <Link href={`/morelike/${id}`}>
              <button className=" dark:text-white text-white bg-gray-400 border px-2 rounded-lg hover:bg-gray-700">
                See More
              </button>
            </Link>
          </div>
          {similarMovies.length > 0 ? (
            <div className="grid grid-cols-5 gap-4 mt-4 dark:text-white">
              {similarMovies.map((similarMovie:any) => (
                <Link key={similarMovie.id} href={`/movie/${similarMovie.id}`}>
                  <div className="w-48 cursor-pointer">
                    <img src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`} alt={similarMovie.title} className="w-48 h-72 object-cover rounded-lg" />
                    <div className=" dark:text-white flex items-center gap-2 mt-2">
                      <FaStar className=" dark:text-white text-yellow-500 text-xl" />
                      <p>{similarMovie.vote_average} <span className="text-blue-600">/10</span></p>
                    </div>
                    <h4 className=" dark:text-white mt-2 text-start">{similarMovie.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4 dark:text-white">No similar movies found.</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MovieDetail;
