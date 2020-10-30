import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { trendingTvAction } from '../../actions/homePageActions';

const TrendingTv = ({ trendingTv, trendingTvAction }) => {
  return (
    <HomePageSection
      state={trendingTv}
      action={trendingTvAction}
      type="tv"
    />
  );
};

const mapStateToProps = ({ trendingTv }) => ({ trendingTv });
const mapDispatchToProps = {
  trendingTvAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingTv);