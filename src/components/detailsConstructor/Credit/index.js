import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import hashid from '../../../utils/hashid';
import style from './style.module.css';

const Credit = ({ actionText, people }) => {
  const renderList = [];
  for (let i = 0; i < Math.min(people.length, 26); i++) {
    const { profile_path, id, name, character, job } = people[i];
    if (!profile_path) continue;
    renderList.push(
      <Link
        style={{ color: 'inherit', textDecoration: 'none' }}
        key={id + i}
        to={`/person/${hashid.encode(id)}`}
      >
        <div className={style.creditContainer}>
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
            width="100"
            height="150"
            alt={name}
            className={style.image}
          />
          <p className={style.name}>{name}</p>
          <p className={style.character}>{character || job}</p>
        </div>
      </Link>
    );
  }

  if (!renderList.length) return null;

  renderList.push(
    <div key="false-margin" className={style.creditContainer}>
      <div className={style.false}></div>
    </div>
  );

  // renderList.push(<div className={`${style.creditContainer} ${style.seeMore}`}>SEE MORE</div>);

  return (
    <>
      <h2 className={style.actionText}>{actionText}</h2>
      <div className={style.wrapper}>{renderList}</div>
      <div style={{ marginBottom: '2rem' }}></div>
    </>
  );
};

export default Credit;
