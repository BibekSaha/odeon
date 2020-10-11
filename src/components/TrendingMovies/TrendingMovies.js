import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { trendingMoviesAction } from '../../actions/homePageActions';

const TrendingMovies = ({ trendingMovies, trendingMoviesAction }) => {
  return (
    <HomePageSection
      state={trendingMovies}
      action={trendingMoviesAction}
    />
  );
};

const mapStateToProps = ({ trendingMovies }) => ({ trendingMovies });
const mapDispatchToProps = {
  trendingMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);