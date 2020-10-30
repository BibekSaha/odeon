import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { netflixTvAction } from '../../actions/homePageActions';

const PopularMovies = ({ netflixTv, netflixTvAction }) => {
  return (
    <HomePageSection
      state={netflixTv}
      action={netflixTvAction}
      type="tv"
    />
  );
};

const mapStateToProps = ({ netflixTv }) => ({ netflixTv });
const mapDispatchToProps = {
  netflixTvAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);