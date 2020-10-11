import React from 'react';
import { connect } from 'react-redux';
import TrendingMovies from '../TrendingMovies/TrendingMovies';
import PopularMovies from '../PopularMovies/PopularMovies';
import { TRENDING_MOVIES_TAB, POPULAR_MOVIES_TAB } from '../../actions/types';

const HomePage = ({ currentTab }) => {
  if (currentTab === TRENDING_MOVIES_TAB) return <TrendingMovies />
  else if (currentTab === POPULAR_MOVIES_TAB) return <PopularMovies />
};

const mapStateToDispatch = ({ homePage }) => ({ currentTab: homePage.currentTab });

export default connect(mapStateToDispatch)(HomePage);