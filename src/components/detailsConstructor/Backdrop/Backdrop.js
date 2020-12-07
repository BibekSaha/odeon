import React from 'react';
import { Link } from 'react-router-dom';
import style from './Backdrop.module.css';

const Backdrop = ({ src, title }) => {
  return (
    <Link to={`/image-viewer${src}`}>
      <div className={style.backdropWrapper}>
        <img
          className={style.backdrop}
          src={`https://image.tmdb.org/t/p/w500${src}`}
          alt={title}
        />
        <div className={style.backdropGradient}></div>
      </div>
    </Link>
  );
};

export default Backdrop;
