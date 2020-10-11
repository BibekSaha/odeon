import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  trendingMoviesTabAction,
  popularMoviesTabAction,
} from '../../actions/homePageTabActions';
import style from './HomePageNav.module.css';

const titles = ['Trending', 'Popular', 'Upcoming', 'Streaming', 'Action'];

const generateClassnamesArray = () =>
  new Array(titles.length).fill(`${style.homePageNavItem}`);

const mountedClassnamesArray = generateClassnamesArray();
mountedClassnamesArray[0] = `${style.homePageNavItem} ${style.homePageNavItemSelected}`;

const HomePageNav = ({ trendingMoviesTabAction, popularMoviesTabAction }) => {
  const [classnames, setClassnames] = useState(mountedClassnamesArray);

  const handleChangingClassName = (i) => {
    const newClassnames = generateClassnamesArray();
    newClassnames[
      i
    ] = `${style.homePageNavItem} ${style.homePageNavItemSelected}`;
    setClassnames(newClassnames);
  };

  const handleOnClick = (action, i) => {
    action();
    handleChangingClassName(i);
  };

  return (
    <div className={style.homePageNavItemWrapper}>
      <h2
        className={classnames[0]}
        onClick={() => handleOnClick(trendingMoviesTabAction, 0)}
      >
        Trending
      </h2>
      <h2
        className={classnames[1]}
        onClick={() => handleOnClick(popularMoviesTabAction, 1)}
      >
        Popular
      </h2>
      <h2 className={classnames[2]}>Upcoming</h2>
      <h2 className={classnames[3]}>Streaming</h2>
      <h2 className={classnames[4]}>Action</h2>
    </div>
  );
};

const mapDispatchToProps = { trendingMoviesTabAction, popularMoviesTabAction };

export default connect(null, mapDispatchToProps)(HomePageNav);
