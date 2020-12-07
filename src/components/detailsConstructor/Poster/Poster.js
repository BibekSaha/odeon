import React from 'react';
import { Link } from 'react-router-dom';
import style from './Poster.module.css';

const Poster = ({ src, alt }) => {
  return (
    <Link to={`/image-viewer${src}`}>
      <img
        className={style.poster}
        src={`https://image.tmdb.org/t/p/w200/${src}`}
        alt={alt}
      />
    </Link>
  );
};

export default Poster;
