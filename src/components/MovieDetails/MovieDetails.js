import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from '../detailsConstructor/Backdrop/Backdrop';
import Poster from '../detailsConstructor/Poster/Poster';
import DetailsSection from '../detailsConstructor/DetailsSection/DetailsSection';
import Title from '../detailsConstructor/Title/Title';
import Duration from '../detailsConstructor/Duration/Duration';
import WatchlistButton from '../detailsConstructor/WatchlistButton/WatchlistButton';
import PlayVideosButton from '../detailsConstructor/PlayVideosButton/PlayVideosButton';
import InformationWrapper from '../detailsConstructor/InformationWrapper/InformationWrapper';
import RatingAndReleaseDate from '../detailsConstructor/RatingAndReleaseDate/RatingAndReleaseDate';
import Overview from '../detailsConstructor/Overview/Overview';
import Genres from '../detailsConstructor/Genres/Genres';
import Recommendation from '../detailsConstructor/Recommendation/Recommendation';
// import ProductionCompanies from '../detailsConstructor/ProductionCompanies';
import Credit from '../detailsConstructor/Credit';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

import handleWatchlist from '../../utils/handleWatchlist';
import hashid from '../../utils/hashid';

import style from './MovieDetails.module.css';

const MovieDetails = ({ auth, watchlist, watchlistFetched }) => {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [showVideos, setShowVideos] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `https://api.odeon.tk/movie/${hashid.decode(id)}?language=en-US&append_to_response=videos%2Ccredits%2Crecommendations`
    )
      .then(resp => resp.json())
      .then(resp => setMovie(resp));

    return () => {
      setShowVideos(false);
      setMovie(null);
      document.body.style.overflow = 'auto';
    };
  }, [id]);

  const handleOnClick = () => {
    if (!auth.isSignedIn) history.push(`/login?redirect=movie/${hashid.decode(id)}`);
    else {
      handleWatchlist(auth, watchlist, movie, 'movie');
      window.navigator.vibrate(50);
    }
  };

  const renderList = movie && (
    <>
      <Helmet>
        <title>{`${movie.original_title} | Odeon`}</title>
      </Helmet>

      <Backdrop
        src={movie.backdrop_path || movie.poster_path}
        title={movie.original_title}
      />

      <DetailsSection>
        <Poster
          src={movie.poster_path}
          alt={movie.original_title}
        />

        <InformationWrapper>
          <Title title={movie.title} />

          <RatingAndReleaseDate
            rating={movie.vote_average}
            releaseDate={movie.release_date}
          />

          <Duration type="movie" duration={movie.runtime} />
        </InformationWrapper>
      </DetailsSection>

      <WatchlistButton
        isPresent={!!watchlist[id]}
        onClick={handleOnClick}
        auth={auth}
        watchlistFetched={watchlistFetched}
      />

      <PlayVideosButton setShowVideos={setShowVideos} />
      {showVideos && (
        <VideoPlayer setShow={setShowVideos} videos={movie.videos} />
      )}

      <Overview details={movie.overview} />
      <Genres genres={movie.genres} />
      {/* <ProductionCompanies companies={movie.production_companies} /> */}
      <Credit people={movie.credits.cast} actionText="Top Cast" />
      <Credit people={movie.credits.crew} actionText="Top Crew" />
      <Recommendation
        type="movie"
        suggestions={movie.recommendations.results}
      />
    </>
  );

  return <div className={style.movieDetails}>{renderList}</div>;
};

const mapStateToProps = ({ auth, watchlist }) => ({ auth, watchlist });

export default connect(mapStateToProps)(MovieDetails);
