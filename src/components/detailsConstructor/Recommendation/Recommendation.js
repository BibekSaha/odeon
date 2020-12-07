import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from './Recommendation.module.css';

const Recommendation = ({ type, suggestions }) => {
  const renderList = suggestions.map(
    suggestion =>
      suggestion.poster_path && (
        <Link key={suggestion.id} to={`/${type}/${suggestion.id}`}>
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/w200${suggestion.poster_path}`}
            alt={suggestion.title}
            className={style.image}
            width={(0.85 * document.documentElement.clientWidth) / 3}
          />
        </Link>
      )
  );

  if (!renderList.length) return null;

  return (
    <div className={style.wrapper}>
      <h3 className={style.header}>You may also like</h3>
      <div className={style.listWrapper}>{renderList}</div>
    </div>
  );
};

export default Recommendation;
