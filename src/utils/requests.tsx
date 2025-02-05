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

//movieDetial

export const getFetchMovie= async (id:number)=>{
  const {data} = await instance.get( `/movie/${id}?api_key=ed40c9caeaf1b576a8d758395b370665&language=en-US`);
return data;
}

export const getMovieVideos = async (id: number) => {
  const { data } = await instance.get(`/movie/${id}/videos?api_key=ed40c9caeaf1b576a8d758395b370665&language=en-US`);
  return data;
};


export const getSimilarMovies = async (id: number) => {
  const { data } = await instance.get(`/movie/${id}/similar?api_key=ed40c9caeaf1b576a8d758395b370665&language=en-US`);
  return data.results; // Зөвхөн кинонуудын жагсаалтыг буцаана
};

export const getMovieCredits = async (id: number) => {
  const { data } = await instance.get(`/movie/${id}/credits?api_key=ed40c9caeaf1b576a8d758395b370665&language=en-US`);
  return data;
};


export const getFetchGenre = async (selectedGenres: number[], page: number) => {
  const { data } = await instance.get(
    `/discover/movie?language=en&with_genres=${selectedGenres.join(
      ","
    )}&page=${page}&api_key=ed40c9caeaf1b576a8d758395b370665`
  );
  return data;
};

export const getGenres = async () => {
  const { data } = await instance.get("genre/movie/list");
  return data;
};

// 🎬 Popular Movies
export const getPopularMovies = async (page: number = 1, genreId?: number) => {
  const { data } = await instance.get("movie/popular", {
    params: { page, ...(genreId && { with_genres: genreId }) },
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
