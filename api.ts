import { QueryFunctionContext } from "@tanstack/react-query";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQyM2Y0MWNmNTY4YTY1NDJhMjAzYzA0M2JlMzI0MyIsInN1YiI6IjY0M2ZlOWJiN2U0MDNkMDJmYzI1OTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jry2V7IwAMEedIiBYhEXioFY3OokzRHqyKcDzdCdWdE"
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

// Movies
const Moviestrending = () =>
  fetch(`${BASE_URL}/trending/movie/week`, options).then((res) => res.json());

const Moviesupcoming = () =>
  fetch(`${BASE_URL}/movie/upcoming`, options).then((res) => res.json());

const MoviesnowPlaying = () =>
  fetch(`${BASE_URL}/movie/now_playing`, options).then((res) => res.json());

const MoviesSearch = ({queryKey} : QueryFunctionContext<[string, string]>) => {
  const [_, query] = queryKey;
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`, options
  ).then((res) => res.json())
}

export const moviesApi = { Moviestrending, Moviesupcoming, MoviesnowPlaying, MoviesSearch };

// Tv
const Tvtrending = () => 
  fetch(`${BASE_URL}/trending/tv/week`, options).then((res) => res.json());

const TvairingToday = () => 
  fetch(`${BASE_URL}/tv/airing_today`, options).then((res) => res.json());

const TvtopRated = () => 
  fetch(`${BASE_URL}/tv/top_rated`, options).then((res) => res.json());

const TvSearch = ({queryKey} : QueryFunctionContext<[string, string]>) => {
  const [_, query] = queryKey;
  return fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`, options
  ).then((res) => res.json())
}

export const tvApi = { Tvtrending, TvairingToday, TvtopRated, TvSearch };

