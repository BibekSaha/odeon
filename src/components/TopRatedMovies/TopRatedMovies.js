import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { topRatedMoviesAction } from '../../actions/homePageActions';

const TopRatedMovies = ({ topRatedMovies, topRatedMoviesAction }) => {
  return (
    <HomePageSection
      state={topRatedMovies}
      action={topRatedMoviesAction}
      type="movie"
    />
  );
};

const mapStateToProps = ({ topRatedMovies }) => ({ topRatedMovies });
const mapDispatchToProps = {
  topRatedMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopRatedMovies);