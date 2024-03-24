import {
  TRENDING_MOVIES,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  DRAMA_MOVIES,
  MYSTERY_MOVIES,
  TRENDING_TV,
  POPULAR_TV,
  TOP_RATED_TV,
  NETFLIX_TV,
  AMAZON_TV,
} from './types';

const fetchData = async (currentPage, totalPages, url, extraQuery) => {
  if (totalPages && currentPage === totalPages) return;
  let resp = await fetch(
    `${url}?language=en-US&&page=${
      currentPage + 1
    }${extraQuery}`
  );
  resp = await resp.json();

  const payload = { currentPage: currentPage + 1, results: [] };
  payload.totalPages = resp.total_pages;
  payload.results = resp.results;
  return payload;
};

const actionCreator = (stateKey, url, type, extraQuery = '') => () => async (
  dispatch,
  getState
) => {
  const state = getState()[stateKey];
  const { currentPage, totalPages } = state;
  const payload = await fetchData(currentPage, totalPages, url, extraQuery);
  return dispatch({ type, payload });
};

export const trendingMoviesAction = actionCreator(
  'trendingMovies',
  'https://odeon-api.netlify.app/trending/movie/day',
  TRENDING_MOVIES
);

export const popularMoviesAction = actionCreator(
  'popularMovies',
  'https://odeon-api.netlify.app/movie/popular',
  POPULAR_MOVIES
);

export const topRatedMoviesAction = actionCreator(
  'topRatedMovies',
  'https://odeon-api.netlify.app/movie/top_rated',
  TOP_RATED_MOVIES
);

export const dramaMoviesAction = actionCreator(
  'dramaMovies',
  'https://odeon-api.netlify.app/discover/movie',
  DRAMA_MOVIES,
  '&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=18'
);

export const mysteryMoviesAction = actionCreator(
  'mysteryMovies',
  'https://odeon-api.netlify.app/discover/movie',
  MYSTERY_MOVIES,
  '&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=9648'
);

export const trendingTvAction = actionCreator(
  'trendingTv',
  'https://odeon-api.netlify.app/trending/tv/day',
  TRENDING_TV,
);

export const popularTvAction = actionCreator(
  'popularTv',
  'https://odeon-api.netlify.app/tv/popular',
  POPULAR_TV
);

export const topRatedTvAction = actionCreator(
  'topRatedTv',
  'https://odeon-api.netlify.app/tv/top_rated',
  TOP_RATED_TV
);

export const netflixTvAction = actionCreator(
  'netflixTv',
  'https://odeon-api.netlify.app/discover/tv',
  NETFLIX_TV,
  '&sort_by=popularity.desc&timezone=America%2FNew_York&with_networks=213&include_null_first_air_dates=false'
);

export const amazonTvAction = actionCreator(
  'amazonTv',
  'https://odeon-api.netlify.app/discover/tv',
  AMAZON_TV,
  '&sort_by=popularity.desc&timezone=America%2FNew_York&with_networks=1024&include_null_first_air_dates=false'
)


// export const trendingMoviesAction = () => async (dispatch, getState) => {
//   const { trendingMovies } = getState();
//   const { currentPage, totalPages } = trendingMovies;
//   const payload = await fetchData(
//     currentPage, totalPages,
//     `https://odeon-api.netlify.app/trending/movie/day?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&page=${currentPage + 1}`
//   );

//   return dispatch({ type: TRENDING_MOVIES, payload });
// };

// export const popularMoviesAction = () => async (dispatch, getState) => {
//   const { popularMovies } = getState();
//   const { currentPage, totalPages } = popularMovies;
//   const payload = await fetchData(
//     currentPage, totalPages,
//     `https://odeon-api.netlify.app/movie/popular?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&language=en-US&&page=${currentPage + 1}`
//   );

//   return dispatch({ type: POPULAR_MOVIES, payload });
// };

// export const topRatedMoviesAction = () => async (dispatch, getState) => {
//   const { topRatedMovies } = getState();
//   const { currentPage, totalPages } = topRatedMovies;
//   const payload = await fetchData(
//     currentPage, totalPages,
//     `https://odeon-api.netlify.app/movie/top_rated?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&language=en-US&&page=${currentPage + 1}`
//   );

//   return dispatch({ type: TOP_RATED_MOVIES, payload });
// };

// export const dramaMoviesAction = () => async (dispatch, getState) => {
//   const { dramaMovies } = getState();
//   const { currentPage, totalPages } = dramaMovies;
//   const payload = await fetchData(
//     currentPage, totalPages,
//     `https://odeon-api.netlify.app/discover/movie?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
//       currentPage + 1
//     }&with_genres=18`
//   );

//   return dispatch({ type: DRAMA_MOVIES, payload });
// };

// export const mysteryMoviesAction = () => async (dispatch, getState) => {
//   const { mysteryMovies } = getState();
//   const { currentPage, totalPages } = mysteryMovies;
//   const payload = await fetchData(
//     currentPage, totalPages,
//     `https://odeon-api.netlify.app/discover/movie?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
//       currentPage + 1
//     }&with_genres=9648`
//   );

//   return dispatch({ type: MYSTERY_MOVIES, payload });
// };

// export const trendingTvAction = () => async (dispatch, getState) => {
//   const { trendingTv } = getState();
//   const { currentPage, totalPages } = trendingTv;
//   const payload = await fetchData(
//     currentPage,
//     totalPages,
//     `https://odeon-api.netlify.app/trending/tv/day?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&page=${currentPage + 1}`
//   );

//   return dispatch({ type: TRENDING_TV, payload });
// };

// export const popularTvAction = () => async (dispatch, getState) => {
//   const { popularTv } = getState();
//   const { currentPage, totalPages } = popularTv;
//   const payload = await fetchData(
//     currentPage,
//     totalPages,
//     `https://odeon-api.netlify.app/tv/popular?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&language=en-US&&page=${currentPage + 1}`
//   );

//   return dispatch({ type: POPULAR_TV, payload });
// };

// export const topRatedTvAction = () => async (dispatch, getState) => {
//   const { topRatedTv } = getState();
//   const { currentPage, totalPages } = topRatedTv;
//   const payload = await fetchData(
//     currentPage,
//     totalPages,
//     `https://odeon-api.netlify.app/tv/top_rated?api_key=${
//       process.env.REACT_APP_TOKEN
//     }&language=en-US&&page=${currentPage + 1}`
//   );

//   return dispatch({ type: TOP_RATED_TV, payload });
// };
