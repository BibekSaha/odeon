import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from '../detailsConstructor/Backdrop/Backdrop';
import DetailsSection from '../detailsConstructor/DetailsSection/DetailsSection';
import Poster from '../detailsConstructor/Poster/Poster';
import InformationWrapper from '../detailsConstructor/InformationWrapper/InformationWrapper';
import Title from '../detailsConstructor/Title/Title';
import RatingAndReleaseDate from '../detailsConstructor/RatingAndReleaseDate/RatingAndReleaseDate';
import Duration from '../detailsConstructor/Duration/Duration';
import WatchlistButton from '../detailsConstructor/WatchlistButton/WatchlistButton';
import PlayVideosButton from '../detailsConstructor/PlayVideosButton/PlayVideosButton';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Overview from '../detailsConstructor/Overview/Overview';
import Genres from '../detailsConstructor/Genres/Genres';
import Recommendation from '../detailsConstructor/Recommendation/Recommendation';
import Credit from '../detailsConstructor/Credit';

import handleWatchlist from '../../utils/handleWatchlist';

// import style from './TvDetails.module.css';

const TvDetails = ({ auth, watchlist, watchlistFetched }) => {
  const { id } = useParams();
  const history = useHistory();
  const [tv, setTv] = useState(null);
  const [showVideos, setShowVideos] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `https://api.odeon.tk/tv/${id}?language=en-US&append_to_response=videos%2Ccredits%2Crecommendations`
    )
      .then(resp => resp.json())
      .then(resp => setTv(resp));

    return () => {
      setShowVideos(false);
      setTv(null);
      document.body.style.overflow = 'auto';
    };
  }, [id]);

  const handleOnClick = useCallback(() => {
    if (!auth.isSignedIn) history.push(`/login?redirect=tv/${id}`);
    else {
      handleWatchlist(auth, watchlist, tv, 'tv');
      window.navigator.vibrate(50);
    }
  }, [auth, history, id, tv, watchlist]);

  const renderList = tv && (
    <>
      <Backdrop
        src={tv.backdrop_path || tv.poster_path}
        title={tv.original_title}
      />

      <DetailsSection>
        <Poster
          src={tv.poster_path}
          alt={tv.original_title}
        />

        <InformationWrapper>
          <Title title={tv.name} />

          <RatingAndReleaseDate
            rating={tv.vote_average}
            releaseDate={tv.first_air_date}
          />

          <Duration
            type="tv"
            duration={(() => {
              let totalEpisodes = 0;
              tv.seasons.forEach(
                season => (totalEpisodes += season.episode_count)
              );
              return `${tv.seasons.length} Seasons ${totalEpisodes} Episodes`;
            })()}
          />
        </InformationWrapper>
      </DetailsSection>

      <WatchlistButton
        isPresent={!!watchlist[id]}
        onClick={handleOnClick}
        auth={auth}
        watchlistFetched={watchlistFetched}
      />

      <PlayVideosButton setShowVideos={setShowVideos} />
      {showVideos && <VideoPlayer setShow={setShowVideos} videos={tv.videos} />}

      <Overview details={tv.overview} />
      <Genres genres={tv.genres} />

      <Credit people={tv.created_by} actionText="Created By" />
      <Credit people={tv.credits.cast} actionText="Top Cast" />
      <Credit people={tv.credits.crew} actionText="Top Crew" />
      <Recommendation type="tv" suggestions={tv.recommendations.results} />
    </>
  );

  return <div>{renderList}</div>;
};

const mapStateToProps = ({ auth, watchlist }) => ({ auth, watchlist });

export default connect(mapStateToProps)(TvDetails);
