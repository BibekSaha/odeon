import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  trendingMoviesTabAction,
  popularMoviesTabAction,
  topRatedMoviesTabAction,
  dramaMoviesTabAction,
  mysteryMoviesTabAction,

  trendingTvTabAction,
  popularTvTabAction,
  topRatedTvTabAction,
  netflixTVTabAction,
  amazonTvTabAction
} from '../../actions/homePageTabActions';
import style from './HomePageNav.module.css';

const titles = ['Trending', 'Popular', 'Top Rated', 'Drama', 'Mystery'];

const generateClassnamesArray = () => new Array(titles.length).fill(`${style.homePageNavItem}`);
const mountedClassnamesArray = () => {
  const mountedClassnamesArray = generateClassnamesArray();
  mountedClassnamesArray[0] = `${style.homePageNavItem} ${style.homePageNavItemSelected}`;
  return mountedClassnamesArray;
};

const HomePageMovieNav = ({
  type,

  trendingMoviesTabAction,
  popularMoviesTabAction,
  topRatedMoviesTabAction,
  dramaMoviesTabAction,
  mysteryMoviesTabAction,

  trendingTvTabAction,
  popularTvTabAction,
  topRatedTvTabAction,
  netflixTVTabAction,
  amazonTvTabAction
}) => {
  const [classnames, setClassnames] = useState(mountedClassnamesArray);

  useEffect(() => trendingMoviesTabAction, [trendingMoviesTabAction]);

  useEffect(() => {
    setClassnames(mountedClassnamesArray);
  }, [type]);

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

  const moviesTabOptions = type === 'movie' && (
    <>
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
      <h2
        className={classnames[2]}
        onClick={() => handleOnClick(topRatedMoviesTabAction, 2)}
      >
        Top Rated
      </h2>
      <h2
        className={classnames[3]}
        onClick={() => handleOnClick(dramaMoviesTabAction, 3)}
      >
        Drama
      </h2>
      <h2
        className={classnames[4]}
        onClick={() => handleOnClick(mysteryMoviesTabAction, 4)}
      >
        Mystery
      </h2>
    </>
  );

  const tvTabOptions = type === 'tv' && (
    <>
      <h2
        className={classnames[0]}
        onClick={() => handleOnClick(trendingTvTabAction, 0)}
      >
        Trending
      </h2>
      <h2
        className={classnames[1]}
        onClick={() => handleOnClick(popularTvTabAction, 1)}
      >
        Popular
      </h2>
      <h2
        className={classnames[2]}
        onClick={() => handleOnClick(topRatedTvTabAction, 2)}
      >
        Top Rated
      </h2>
      <h2
        className={classnames[3]}
        onClick={() => handleOnClick(netflixTVTabAction, 3)}
      >
        Netflix
      </h2>
      <h2
        className={classnames[4]}
        onClick={() => handleOnClick(amazonTvTabAction, 4)}
      >
        Amazon
      </h2>
    </>
  );

  return (
    <div className={style.homePageNavItemWrapper}>
      {type === 'movie' ? moviesTabOptions : tvTabOptions}
    </div>
  );
};

const mapStateToProps = ({ homePage }) => ({ type: homePage.type });

const mapDispatchToProps = {
  trendingMoviesTabAction,
  popularMoviesTabAction,
  topRatedMoviesTabAction,
  dramaMoviesTabAction,
  mysteryMoviesTabAction,

  trendingTvTabAction,
  popularTvTabAction,
  topRatedTvTabAction,
  netflixTVTabAction,
  amazonTvTabAction
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageMovieNav);
