"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getGenreIdMovies } from "../../utils/requests"; // Ensure correct path
import MoviesList from "@/components/MoviesList"; // Ensure correct import

export default function CategoryPage() {
  const router = useRouter();
  const { genreId } = router.query; // Get genreId from the URL

  const [loading, setLoading] = useState(true);

  // Wait for genreId to be available
  useEffect(() => {
    if (genreId) {
      setLoading(false);
    }
  }, [genreId]);

  // Loading screen
  if (loading) {
    return <div>Loading...</div>;
  }

  // Parse genreId and check if it is valid
  const parsedGenreId = genreId ? parseInt(genreId as string, 10) : NaN;

  if (isNaN(parsedGenreId)) {
    return <div>Invalid Genre</div>;
  }

  return (
    <div>
      <h1>Жанрын Кино</h1>
      <MoviesList genreId={parsedGenreId} />
    </div>
  );
}
