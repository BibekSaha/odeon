import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { popularMoviesAction } from '../../actions/homePageActions';

const PopularMovies = ({ popularMovies, popularMoviesAction }) => {
  return (
    <HomePageSection
      state={popularMovies}
      action={popularMoviesAction}
      type="movie"
    />
  );
};

const mapStateToProps = ({ popularMovies }) => ({ popularMovies });
const mapDispatchToProps = {
  popularMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);