import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  trendingMoviesTabAction,
  trendingTvTabAction,
} from '../../actions/homePageTabActions';

const Dropdown = ({
  trendingTvTabAction,
  trendingMoviesTabAction,
  className,
}) => {
  const [value, setValue] = useState('movie');

  const handleOnChange = useCallback(
    e => {
      if (e.target.value === 'tv') {
        setValue('tv');
        trendingTvTabAction();
      } else {
        setValue('movie');
        trendingMoviesTabAction();
      }
    },
    [trendingTvTabAction, trendingMoviesTabAction]
  );

  return (
    <div>
      <select className={className} value={value} onChange={handleOnChange}>
        <option value="movie">Movies</option>
        <option value="tv">Series</option>
      </select>
    </div>
  );
};

const mapDispatchToProps = { trendingTvTabAction, trendingMoviesTabAction };

export default connect(null, mapDispatchToProps)(Dropdown);
