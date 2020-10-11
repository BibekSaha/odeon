import { combineReducers } from 'redux';
import { trendingMoviesReducer, popularMoviesReducer } from './homePageReducers';
import homePageTabReducer from './homePageTabReducer'

export default combineReducers({
  homePage: homePageTabReducer,
  trendingMovies: trendingMoviesReducer,
  popularMovies: popularMoviesReducer
});