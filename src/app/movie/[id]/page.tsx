"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFetchMovie, getMovieCredits, getSimilarMovies, getMovieVideos } from "@/utils/requests";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MovieDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const [movie, setMovie] = useState<any>(null);
  const [director, setDirector] = useState<string | null>(null);
  const [stars, setStars] = useState<string[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null); // Трейлер хадгалах state

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        const data = await getFetchMovie(Number(id));
        setMovie(data);

        const credits = await getMovieCredits(Number(id));
        const directorData = credits.crew.find((person: any) => person.job === "Director");
        setDirector(directorData ? directorData.name : "Unknown");

        const actors = credits.cast.slice(0, 5).map((actor: any) => actor.name);
        setStars(actors);

        
        const similar = await getSimilarMovies(Number(id));
        setSimilarMovies(similar.slice(0, 6));

      
        const videoData = await getMovieVideos(Number(id));
        const trailerVideo = videoData.results?.find((video: any) => video.type === "Trailer" && video.site === "YouTube");
        setTrailerKey(trailerVideo ? trailerVideo.key : null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    
    <div className="">
      <Header />
      <h2 className="text-3xl font-bold">{movie.title}</h2>
      <div className="flex justify-center items-center gap-6 w-full mr-[50px] ml-[50px]">
  {/* Кино постер */}
  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
    className="w-1/3 h-[400px] rounded-lg"
  />

  {/* 🎥 Трейлер */}
  {trailerKey && (
    <div className="flex-1">
      <iframe
        className="w-full h-[400px] rounded-lg"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        allowFullScreen
      ></iframe>
    </div>
  )}
</div>
      <p className="text-lg">{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>


      <p><strong>Director:</strong> {director}</p>

      <p><strong>Stars:</strong> {stars.join(", ")}</p>
    

      <h3 className="text-2xl font-bold mt-6">More Like This</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
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
      <Footer/>
    </div>
  );
};

export default MovieDetail;
