const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQyM2Y0MWNmNTY4YTY1NDJhMjAzYzA0M2JlMzI0MyIsInN1YiI6IjY0M2ZlOWJiN2U0MDNkMDJmYzI1OTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jry2V7IwAMEedIiBYhEXioFY3OokzRHqyKcDzdCdWdE"
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week`, options).then((res) =>
    res.json()
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming`, options
  ).then((res) => res.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing`, options
  ).then((res) => res.json());


export const moviesApi = { trending, upcoming, nowPlaying }
