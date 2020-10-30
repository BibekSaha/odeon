import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { popularTvAction } from '../../actions/homePageActions';

const PopularTv = ({ popularTv, popularTvAction }) => {
  return (
    <HomePageSection
      state={popularTv}
      action={popularTvAction}
      type="tv"
    />
  );
};

const mapStateToProps = ({ popularTv }) => ({ popularTv });
const mapDispatchToProps = {
  popularTvAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularTv);