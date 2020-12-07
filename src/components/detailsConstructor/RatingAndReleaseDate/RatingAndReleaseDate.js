import React from 'react';
import StarIcon from '../../icons/StarIcon';
import dateFormatter from '../../../utils/date';
import style from './RatingAndReleaseDate.module.css';

const RatingAndReleaseDate = ({ rating, releaseDate }) => {
  return (
    <div className={style.wrapper}>
      <StarIcon
        height="1.4rem"
        width="1.2rem"
        strokeColor="var(--star-yellow)"
      />
      &nbsp;
      <strong className={rating}>
        {parseFloat(rating) || 'N/A'}
        <span style={{ color: 'var(--muted)' }}>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
        </span>
      </strong>
      <span className={style.date}>{dateFormatter(releaseDate)}</span>
    </div>
  );
};

export default RatingAndReleaseDate;
