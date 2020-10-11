import { TRENDING_MOVIES, POPULAR_MOVIES } from './types';

export const trendingMoviesAction = () => async (dispatch, getState) => {
  const { trendingMovies } = getState();
  if (Object.keys(trendingMovies.results).length)
    return dispatch({ type: TRENDING_MOVIES, payload: {} });
  
  let resp = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TOKEN}`);
  resp = await resp.json();

  const payload = { totalPages: 1, currentPage: 1, results: {} };
  payload.totalPages = resp.total_pages;
  payload.results = resp.results;

  return dispatch({ type: TRENDING_MOVIES, payload });
};

export const popularMoviesAction = () => async (dispatch, getState) => {
  const { popularMovies } = getState();
  if (Object.keys(popularMovies.results).length)
    return dispatch({ type: POPULAR_MOVIES, payload: {} });
  
  let resp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TOKEN}&language=en-US`);
  resp = await resp.json();

  const payload = { totalPages: 1, currentPage: 1, results: {} };
  payload.totalPages = resp.total_pages;
  payload.results = resp.results;

  return dispatch({ type: POPULAR_MOVIES, payload });
};

