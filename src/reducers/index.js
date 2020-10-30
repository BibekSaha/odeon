import { combineReducers } from 'redux';
// import {
//   trendingMoviesReducer,
//   popularMoviesReducer,
//   topRatedMoviesReducer,
//   dramaMoviesReducer,
//   mysteryMoviesReducer,
//   trendingTvReducer,
//   popularTvReducer,
//   topRatedTvReducer
// } from './homePageReducers';
import { generateReducerWithType } from './homePageReducers';
import homePageTabReducer from './homePageTabReducer';
import authenticationReducer from './authenticationReducer';
import watchlistReducer from './watchlistReducer';

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
  AMAZON_TV
} from '../actions/types';

// export default combineReducers({
//   homePage: homePageTabReducer,
//   trendingMovies: trendingMoviesReducer,
//   popularMovies: popularMoviesReducer,
//   topRatedMovies: topRatedMoviesReducer,
//   dramaMovies: dramaMoviesReducer,
//   mysteryMovies: mysteryMoviesReducer,

//   trendingTv: trendingTvReducer,
//   popularTv: popularTvReducer,
//   topRatedTv: topRatedTvReducer
// });


export default combineReducers({
  auth: authenticationReducer,
  watchlist: watchlistReducer, 
  homePage: homePageTabReducer,
  trendingMovies: generateReducerWithType(TRENDING_MOVIES),
  popularMovies: generateReducerWithType(POPULAR_MOVIES),
  topRatedMovies: generateReducerWithType(TOP_RATED_MOVIES),
  dramaMovies: generateReducerWithType(DRAMA_MOVIES),
  mysteryMovies: generateReducerWithType(MYSTERY_MOVIES),

  trendingTv: generateReducerWithType(TRENDING_TV),
  popularTv: generateReducerWithType(POPULAR_TV),
  topRatedTv: generateReducerWithType(TOP_RATED_TV),
  netflixTv: generateReducerWithType(NETFLIX_TV),
  amazonTv: generateReducerWithType(AMAZON_TV)
});
