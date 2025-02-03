"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { getGenres } from "../utils/requests"; // Or your own API call to get movies by genre
import { useParams } from "next/navigation";

interface Genre {
  id: number;
  name: string;
  genreId: number;
}

const CategoryPage = () => {
  const router = useRouter();
  const params = useParams<{ genreId: string }>(); // Grab the genreId from the URL
  const { genreId } = params || {};

  const [loading, setLoading] = useState(true);
  const [genreMovies, setGenreMovies] = useState<any[]>([]); // Assuming you fetch movies by genre

  useEffect(() => {
    if (genreId) {
      const fetchGenreMovies = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=1&api_key=ed40c9caeaf1b576a8d758395b370665`
          );
          const data = await response.json();
          console.log(data);

          setGenreMovies(data.results); //
          setLoading(false);
        } catch (error) {
          console.error("Error fetching genre movies:", error);
          setLoading(false);
        }
      };

      fetchGenreMovies();
    }
  }, [genreId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!genreId) {
    return <div>Invalid Genre ID</div>;
  }

  return (
    <div>
      <h1>Genre: {genreId}</h1>
      <div>
        {genreMovies.length === 0 ? (
          <p>No movies found for this genre.</p>
        ) : (
          <ul>
            {genreMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li> // Assuming movie object has 'id' and 'title'
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
