import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { InView } from 'react-intersection-observer';
import dateFormatter from '../../utils/date';
import style from './HomePageSection.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HomePageSection = ({ action, state }) => {
  const [current, setCurrent] = useState({});
  const [classnames, setClassnames] = useState([]);

  useEffect(() => {
    const getTrendingMoives = async () => await action();
    getTrendingMoives();
  }, [action]);

  useEffect(
    () =>
      setClassnames(
        new Array(state.results.length).fill(style.notInViewImage)
      ),
    [state.results]
  );

  const renderList =
    !!Object.keys(state.results).length &&
    state.results.map((movie, i) => (
      <InView
        as="div"
        key={movie.id}
        onChange={(inView) => {
          const newClassnames = [...classnames];
          if (inView) {
            setCurrent(movie);
            newClassnames[i] = '';
            setClassnames(newClassnames);
          } else {
            newClassnames[i] = style.notInViewImage;
            setClassnames(newClassnames);
          }
        }}
        className={`${style.homePageSectionItem}`}
        threshold={0.7}
      >
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={`${style.homePageSectionItem_image} ${classnames[i]}`}
          // className={style.homePageSectionItem_image}
          effect="blur"
          threshold="500"
        />
      </InView>
    ));

  const renderDetails = !!Object.keys(current).length && (
    <>
      <h1>{current.title}</h1>
      <h3>{dateFormatter(current.release_date)}</h3>
      <h3>
        <span role="img" aria-label="star">
          ⭐
        </span>{' '}
        {parseFloat(current.vote_average) || 'N/A'}
      </h3>
    </>
  );

  return (
    <div>
      <div className={style.homePageSectionWrapper}>{renderList}</div>
      <div className={style.homePageSectionDetails}>{renderDetails}</div>
    </div>
  );
};

export default HomePageSection;
