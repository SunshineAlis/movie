"use client";

import { useEffect, useState } from "react";
import { getGenreIdMovies } from "../utils/requests"; // Ensure correct import path

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function MovieList({ genreId }: { genreId: number }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getGenreIdMovies(genreId, page);
        if (data && data.results) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId, page]);

  return (
    <div>
      <h2>Кино жагсаалт</h2>
      {loading ? (
        <p>Татаж байна...</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
        {loading ? "Татаж байна..." : "Дараагийн хуудас"}
      </button>
    </div>
  );
}
