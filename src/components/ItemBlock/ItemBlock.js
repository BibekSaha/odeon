import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../Placeholder/Placeholder';
import StarIcon from '../icons/StarIcon';
import dateFormatter from '../../utils/date';
import hashid from '../../utils/hashid';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './ItemBlock.module.css';

const ItemBlock = props => {
  const isSeries = props.media_type === 'tv';

  return (
    <div>
      <Link
        to={`/${props.media_type}/${hashid.encode(props.id)}`}
        style={{ color: 'inherit', textDecoration: 'none' }}
        key={props.id}
      >
        <div className={style.searchResult}>
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/w200/${props.poster_path}`}
            alt={props.title || props.name}
            className={style.searchResultImage}
            height="150px"
            width="100px"
            // effect="blur"
            placeholder={
              <Placeholder width="100px" paddingTop="150%" borderRadius="3px" />
            }
          />
          <div className={style.searchResultDetails}>
            <h1 className={style.searchHeader}>{props.name || props.title}</h1>
            <br />
            <div>
              <p>
                {dateFormatter(props.release_date)}
                {isSeries && ' | TV Series'}
              </p>
              <p
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
               <StarIcon height="1.1rem" width="1.1rem" strokeColor="var(--star-yellow)" /> &nbsp;
                {parseFloat(props.vote_average) || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemBlock;
