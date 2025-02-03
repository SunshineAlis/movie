import axios from "axios";

const BASE_URL = process.env.BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY тохируулагдаагүй байна!");
}

const instance = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});
 
//  genreId
export const getGenreIdMovies = async (genreId?: number, page: number = 1) => {
  const { data } = await instance.get("discover/movie", {
    params: { page, ...(genreId ? { with_genres: genreId } : {}) }
  });
  return data;
};

export const getGenres = async () => {
  const { data } = await instance.get("genre/movie/list");
  return data; // TMDB API нь { genres: [{ id: number, name: string }] } хэлбэрээр өгөгдөл буцаана
};



// 🎬 Popular Movies
export const getPopularMovies = async (page: number = 1, genreId?: number) => {
  const { data } = await instance.get("movie/popular", { 
    params: { page, ...(genreId && { with_genres: genreId }) }
  });
  return data;
};


// 🎬 Upcoming Movies
export const getUpComingMovies = async (page: number = 1) => {
  const { data } = await instance.get("movie/upcoming", { params: { page } });
  return data;
};


export const getTopRatedMovies = async (page = 1) => {
  const { data } = await instance.get(`movie/top_rated`, {
    params: { page },
  });
  return data;
};
