import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieList from './MovieList';


interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

const MovieCategoryList = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]); 
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  const [isClient, setIsClient] = useState(false);  // to track if we are on the client side
  const router = useRouter(); // Initialize useRouter normally

  useEffect(() => {
    setIsClient(true); // Set to true once component is mounted on client side
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); 
      try {
        const fetchCategory = async (category: 'popular' | 'upcoming' | 'top_rated') => {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=your_api_key`);
          const data = await res.json();
          return data.results || [];
        };

        const popular = await fetchCategory('popular');
        const upcoming = await fetchCategory('upcoming');
        const topRated = await fetchCategory('top_rated');

        setPopularMovies(popular);
        setUpComingMovies(upcoming);
        setTopRatedMovies(topRated);
        setError(null); 
      } catch (error) {
        setError('Error fetching movie data.'); 
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMovies();
  }, []); 

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <>
      <Header />
      <div className="w-full px-10 py-5 bg-black">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-white text-2xl font-bold">All Movies</h2>
          {isClient && (  // Ensure router is only used when the component is mounted client-side
            <button 
              onClick={() => router.back()} 
              className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
              Back
            </button>
          )}
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <button 
            onClick={() => handleCategoryChange('upcoming')} 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'upcoming' ? 'bg-gray-600' : 'bg-gray-800'} hover:bg-gray-700`}>
            Upcoming
          </button>
          <button 
            onClick={() => handleCategoryChange('popular')} 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'popular' ? 'bg-gray-600' : 'bg-gray-800'} hover:bg-gray-700`}>
            Popular
          </button>
          <button 
            onClick={() => handleCategoryChange('topRated')} 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'topRated' ? 'bg-gray-600' : 'bg-gray-800'} hover:bg-gray-700`}>
            Top Rated
          </button>
        </div>

        {/* Conditional Rendering based on selected category */}
        {selectedCategory === 'upcoming' && (
          <MovieList title="Upcoming Movies" movies={upComingMovies.slice(0, 5)} seeMoreLink="/movies/upcoming" />
        )}
        {selectedCategory === 'popular' && (
          <MovieList title="Popular Movies" movies={popularMovies.slice(0, 5)} seeMoreLink="/movies/popular" />
        )}
        {selectedCategory === 'topRated' && (
          <MovieList title="Top Rated Movies" movies={topRatedMovies.slice(0, 5)} seeMoreLink="/movies/top-rated" />
        )}

        {/* Default display when no category is selected */}
        {!selectedCategory && (
          <>
            <MovieList title="Upcoming Movies" movies={upComingMovies.slice(0, 5)} seeMoreLink="/movies/upcoming" />
            <MovieList title="Popular Movies" movies={popularMovies.slice(0, 5)} seeMoreLink="/movies/popular" />
            <MovieList title="Top Rated Movies" movies={topRatedMovies.slice(0, 5)} seeMoreLink="/movies/top-rated" />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MovieCategoryList;
