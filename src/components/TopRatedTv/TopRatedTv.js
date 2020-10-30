import React from 'react';
import { connect } from 'react-redux';
import HomePageSection from '../HomePageSection/HomePageSection';
import { topRatedTvAction } from '../../actions/homePageActions';

const TopRatedTv = ({ topRatedTv, topRatedTvAction }) => {
  return (
    <HomePageSection state={topRatedTv} action={topRatedTvAction} type="tv" />
  );
};

const mapStateToProps = ({ topRatedTv }) => ({ topRatedTv });
const mapDispatchToProps = {
  topRatedTvAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopRatedTv);
