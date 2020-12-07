import React from 'react';
import style from './Genres.module.css';

const Genres = ({ genres }) => {
  return (
    <div className={style.genresWrapper}>
      {genres.map(genre => (
        <div
          onClick={() => window.navigator.vibrate(50)}
          className={`${style.genre}`}
          key={genre.id}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default Genres;