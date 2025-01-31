import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const instance = axios.create({ baseURL: BASE_URL });

export const getPopularMovies = async () => {
  const { data } = await instance.get(`movie/popular?api_key=${API_KEY}`);
  return data;
};

export const getUpComingMovies = async () => {
  const { data } = await instance.get(`movie/upcoming?api_key=${API_KEY}`);
  return data;
};

export const getTopRatedMovies = async () => {
  const { data } = await instance.get(`movie/top_rated?api_key=${API_KEY}`);
  return data;
};
