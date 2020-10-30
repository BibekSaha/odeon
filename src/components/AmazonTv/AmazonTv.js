import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { amazonTvAction } from '../../actions/homePageActions';

const PopularMovies = ({ amazonTv, amazonTvAction }) => {
  return (
    <HomePageSection
      state={amazonTv}
      action={amazonTvAction}
      type="tv"
    />
  );
};

const mapStateToProps = ({ amazonTv }) => ({ amazonTv });
const mapDispatchToProps = {
  amazonTvAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);