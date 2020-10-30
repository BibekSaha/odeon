import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { mysteryMoviesAction } from '../../actions/homePageActions';

const MysteryMovies = ({ mysteryMovies, mysteryMoviesAction }) => {
  return (
    <HomePageSection
      state={mysteryMovies}
      action={mysteryMoviesAction}
      type="movie"
    />
  );
};

const mapStateToProps = ({ mysteryMovies }) => ({ mysteryMovies });
const mapDispatchToProps = {
  mysteryMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MysteryMovies);