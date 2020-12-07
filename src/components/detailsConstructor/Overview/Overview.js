import React from 'react';
import style from './Overview.module.css';

const Overview = ({ details }) => {
  return <div className={style.overview}>{details}</div>;
};

export default Overview;