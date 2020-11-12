import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import PlusIcon from '../icons/PlusIcon';
import CheckIcon from '../icons/CheckIcon';
import StarIcon from '../icons/StarIcon';
import handleWatchlist from '../../utils/handleWatchlist';
import dateFormatter from '../../utils/date';
import runtime from '../../utils/runtime';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './MovieDetails.module.css';

const MovieDetails = ({ auth, watchlist, watchlistFetched }) => {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TOKEN}&language=en-US`
    )
      .then(resp => resp.json())
      .then(resp => setMovie(resp));
  }, [id]);

  const handleOnClick = () => {
    if (!auth.isSignedIn) history.push(`/login?redirect=movie/${id}`);
    else {
      handleWatchlist(auth, watchlist, movie, 'movie');
      window.navigator.vibrate(50);
    }
  };

  const renderGenres =
    movie &&
    movie.genres &&
    movie.genres.map((genere, i) => (
      <div
        onClick={() => window.navigator.vibrate(50)}
        className={`${style.genre}`}
      >
        {genere.name}
      </div>
    ));

  const renderList = movie && (
    <>
      <div className={style.backdropWrapper}>
        <img
          className={style.backdrop}
          src={`https://image.tmdb.org/t/p/w500/${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.original_title}
        />
        <div className={style.backdropGradient}></div>
      </div>

      <div className={style.posterSection}>
        <img
          className={style.poster}
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.original_title}
        />

        <div className={style.movieInformation}>
          <h1
            style={{
              background: 'radial-gradient(#eff1ff 45%, #000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'var(--white)',
              backgroundSize: '100% 200%',
              backgroundPosition: '50% 100%',
            }}
          >
            {movie.title}
          </h1>

          <div className={style.rating}>
            <StarIcon
              height="1.4rem"
              width="1.2rem"
              strokeColor="var(--star-yellow)"
            />
            &nbsp;{' '}
            <strong
              style={{
                fontSize: '0.9rem',
              }}
            >
              {parseFloat(movie.vote_average) || 'N/A'}&nbsp;
              <span style={{ color: 'var(--muted)' }}>{'\t'}&middot;</span>
              {'\t'}
              <span style={{ color: 'var(--muted)', fontWeight: 'normal' }}>
                {dateFormatter(movie.release_date)}
              </span>
            </strong>
          </div>

          <p className={style.runtime}>{runtime(movie.runtime)}</p>
        </div>
      </div>

      <div
        className={`${style.watchlistItem} ${
          !watchlist[id] && style.watchlistItemNotPresent
        }`}
      >
        {(auth.isSignedIn && !watchlistFetched) || auth.isSignedIn === null ? (
          <Loader
            type="TailSpin"
            color="var(--primary)"
            height={20}
            width={20}
          />
        ) : (
          <div onClick={handleOnClick} className={style.watchlistTextFormatter}>
            {watchlist[id] ? (
              <CheckIcon width="1.5rem" height="1.5rem" strokeColor="gray" />
            ) : (
              <PlusIcon
                width="1.5rem"
                height="1.5rem"
                strokeColor="var(--primary)"
              />
            )}
            <strong>
              {watchlist[id] ? 'Added to Watchlist' : 'Add to Watchlist'}
            </strong>
          </div>
        )}
      </div>
      <div className={style.overview}>{movie.overview}</div>
      <div className={style.genresWrapper}>{renderGenres}</div>
    </>
  );

  return <div className={style.movieDetails}>{renderList}</div>;
};

const mapStateToProps = ({ auth, watchlist }) => ({ auth, watchlist });

export default connect(mapStateToProps)(MovieDetails);
