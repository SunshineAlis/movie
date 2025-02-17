import axios from "axios";
// import {useEffect,useState} from "react";

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
  const {data} = await instance.get( `/movie/${id}?api_key=${API_KEY}`);
return data;
}

//search 
export const getSearchMovies =async (query:string)=>{
  const {data} = await instance.get (`https://api.themoviedb.org/3/search/movie?query=${query}&language=en&api_key=${API_KEY}`);
return data;
}




export const getGenres = async (page: number = 1, genreId?: number) => {
  const { data } = await instance.get("genre/movie/list", {
    params: { page, ...(genreId && { with_genres: genreId }) },
  });
  return data;
};


export const getMovieVideos = async (id: number) => {
  const { data } = await instance.get(`/movie/${id}/videos?api_key=${API_KEY}`);
  return data;
};


export const getSimilarMovies = async (id: number) => {
  const { data } = await instance.get(`/movie/${id}/similar?api_key=${API_KEY}`);
  return data.results; 
};


export const getMovieCredits = async (id: number) => {
  const { data } = await instance.get(`/movie/${id}/credits?api_key=${API_KEY}`);
  return data;
};

export const getMoreLikeMovies = async (id: number, page: number = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getFetchGenre = async (selectedGenres: number[], page: number) => {
  const { data } = await instance.get(
    `/discover/movie?language=en&with_genres=${selectedGenres.join(
      ","
    )}&page=${page}&api_key=${API_KEY}`
  );
  return data;
};


export const getMoviesByGenres = async (genreIds: number[]) => {
  if (!genreIds.length) return { results: [] }; 

  try {
    const response = await fetch(
      `/api/movies?genres=${genreIds.join(",")}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genres");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies by genres:", error);
    return { results: [] };
  }
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
