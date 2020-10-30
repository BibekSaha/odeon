import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { dramaMoviesAction } from '../../actions/homePageActions';

const TopRatedMovies = ({ dramaMovies, dramaMoviesAction }) => {
  return (
    <HomePageSection
      state={dramaMovies}
      action={dramaMoviesAction}
      type="movie"
    />
  );
};

const mapStateToProps = ({ dramaMovies }) => ({ dramaMovies });
const mapDispatchToProps = {
  dramaMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopRatedMovies);