import React from 'react';
import PlayIcon from '../../icons/PlayIcon';
import watchlistStyle from '../WatchlistButton/WatchlistButton.module.css';
import style from './PlayVideosButton.module.css';

const PlayVideo = ({ setShowVideos }) => {
  return (
    <div onClick={() => setShowVideos(true)} className={`${watchlistStyle.watchlistButtonWrapper} ${style.button}`}>
      <div className={watchlistStyle.watchlistTextFormatter}>
        <PlayIcon height="1.5rem" width="1.5rem" strokeColor="var(--primary)" />
        &nbsp;<strong>Play Videos</strong>
      </div>
    </div>
  );
};

export default PlayVideo;
