"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowRight, FaStar } from "react-icons/fa";
import {
  getFetchMovie,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "@/utils/requests";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  ChevronRightSquare,
  ChevronsRightIcon,
} from "lucide-react";

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
          credits.crew.find((member: any) => member.job === "Director")?.name ||
            "Unknown"
        );
        setWriters(
          credits.crew
            .filter((member: any) => member.job === "Writer")
            .map((writer: any) => writer.name)
            .join(", ") || "Unknown"
        );
        setStars(
          credits.cast?.slice(0, 5).map((actor: any) => actor.name) || []
        );

        const similar = await getSimilarMovies(Number(id));
        setSimilarMovies(similar.slice(0, 5));

        const videoData = await getMovieVideos(Number(id));
        const trailerVideo = videoData.results?.find(
          (video: any) =>
            video.type.toLowerCase() === "trailer" &&
            video.site.toLowerCase() === "youtube"
        );
        setTrailerKey(trailerVideo ? trailerVideo.key : null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const convertRuntime = (minutes: number) =>
    `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  const formatVoteCount = (count: number) =>
    count >= 1_000_000
      ? (count / 1_000_000).toFixed(1) + "M"
      : count >= 1_000
      ? (count / 1_000).toFixed(1) + "k"
      : count.toString();

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-[1200px] mx-auto dark:text-white">
      <Header />
      <div className="mr-10 ml-12 flex flex-col gap-4">
        {window.innerWidth >= 375 && window.innerWidth <= 950 ? (
          <div className="flex justify-between">
            <div>
              <h2 className="text-l font-bold md:text-2xl">{movie.title}</h2>
              <div className="flex items-center gap-1 text-xs md:text-xl">
                <h2>{movie.release_date}</h2>
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <h2>PG</h2>
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <h2>{convertRuntime(movie.runtime)}</h2>
              </div>
            </div>

            <div className="flex items-center gap-[2px]">
              <FaStar className="text-yellow-500 text-2xl" />
              <div>
                <p className="text-xs">
                  {movie.vote_average}{" "}
                  <span className="text-blue-600 text-xs">/10</span>
                </p>
                <p className="text-center text-xs">
                  {formatVoteCount(movie.vote_count)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between mr-[20px]">
            <div>
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <div className="flex items-center gap-2 text-xl">
                <h2>{movie.release_date}</h2>
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <h2>PG</h2>
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <h2>{convertRuntime(movie.runtime)}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaStar className="text-yellow-500 text-4xl" />
              <div>
                <p>
                  {movie.vote_average}{" "}
                  <span className="text-blue-600">/10</span>
                </p>
                <p className="text-center">
                  {formatVoteCount(movie.vote_count)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* uurchlugduh heseg */}
        {window.innerWidth >= 375 && window.innerWidth <= 950 ? (
          <div>
            {trailerKey && (
              <iframe
                className="w-full h-56"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allowFullScreen
              ></iframe>
            )}
            <div className="flex">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-[30%] m-[3%] rounded-lg"
              />
              <div className="flex flex-col">
                <div className="flex flex-wrap gap-2 w-4/5 w-full mt-[2%]">
                  {movie.genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="bg-white border text-black py-1 px-2 rounded-xl text-[8px] font-bold"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="text-xs">{movie.overview}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full w-[17%] m-[1%] h-80 rounded-lg "
              />
              {trailerKey && (
                <iframe
                  className="w-full h-80 rounded-lg"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {movie.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="bg-white border text-black py-1 px-5 rounded-2xl text-xs font-bold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-lg">{movie.overview}</p>
          </div>
        )}
        {window.innerWidth >= 375 && window.innerWidth <= 950 ? (
          <div>
            <div className="flex flex-col gap-[3px] text-xs">
              <div className="flex items-center">
                <strong>Director:</strong>
                <p className="ml-[12px]">{director}</p>
              </div>
              <div className="flex items-center">
                <strong>Writers:</strong>
                <p className="ml-[18px]">{writers}</p>
              </div>
              <div className="flex items-center">
                <strong>Stars:</strong>
                <p className="ml-[30px]">{stars.join(", ")}</p>
              </div>
            </div>
            <div className="w-full flex  flex-col items-center">
              <div className="flex justify-between items-center space-x-11 mt-[5px] md:space-x-96">
                <h3 className="text-xl font-bold items-center">
                  More Like This
                </h3>

                <Link href={`/morelike/${id}`}>
                  <button className=" text-black px-2 text-[13px] px-[5px] w-[100px] rounded-[8px] flex items-center hover:bg-gray-500">
                    See More
                    <FaArrowRight className="ml-[2px] items-center" />
                  </button>
                </Link>
              </div>

              {similarMovies.length > 0 ? (
                <div className="grid grid-cols-2 text-[12px] overflow-hidden text-ellipsis md:grid-cols-5 gap-4 mt-4 ">
                  {similarMovies.map((similarMovie: any) => (
                    <Link
                      key={similarMovie.id}
                      href={`/movie/${similarMovie.id}`}
                    >
                      <div className="cursor-pointer">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                          alt={similarMovie.title}
                          className="w-48 h-72 object-cover rounded-lg"
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <FaStar className="text-yellow-500 text-xl" />
                          <p>
                            {similarMovie.vote_average}{" "}
                            <span className="text-blue-600">/10</span>
                          </p>
                        </div>
                        <h4 className="mt-2 text-start">
                          {similarMovie.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No similar movies found.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-[3px] text-sx">
              <div className="flex items-center">
                <strong>Director:</strong>
                <p className="ml-[8px]">{director}</p>
              </div>
              <div className="flex items-center">
                <strong>Writers:</strong>
                <p className="ml-[12px]">{writers}</p>
              </div>
              <div className="flex items-center">
                <strong>Stars:</strong>
                <p className="ml-[30px]">{stars.join(", ")}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between">
                <h3 className="text-2xl font-bold items-center">
                  More Like This
                </h3>
                <Link href={`/morelike/${id}`}>
                  <button className="text-black flex gap-[4px]  px-3 rounded-xl items-center hover:bg-gray-500">
                    See More
                    <FaArrowRight />
                  </button>
                </Link>
              </div>
              {similarMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {similarMovies.map((similarMovie: any) => (
                    <Link
                      key={similarMovie.id}
                      href={`/movie/${similarMovie.id}`}
                    >
                      <div className="cursor-pointer">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                          alt={similarMovie.title}
                          className="w-48 h-72 object-cover rounded-lg"
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <FaStar className="text-yellow-500 text-xl" />
                          <p>
                            {similarMovie.vote_average}{" "}
                            <span className="text-blue-600">/10</span>
                          </p>
                        </div>
                        <h4 className="mt-2 text-start">
                          {similarMovie.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No similar movies found.</p>
              )}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default MovieDetail;
