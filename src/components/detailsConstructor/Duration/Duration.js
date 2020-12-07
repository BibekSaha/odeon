import React from 'react';
import runtime from '../../../utils/runtime';
import style from './Duration.module.css';

const Duration = ({ type, duration }) => {
  return <p className={style.runtime}>{type === 'movie' ?runtime(duration) : duration}</p>;
};

export default Duration;
