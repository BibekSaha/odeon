import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSwipeable } from 'react-swipeable';
import CloseIcon from '../icons/CloseIcon';
import YouTube from 'react-youtube';
import style from './VideoPlayer.module.css';

const VideoPlayer = ({ setShow, videos: { results: videos } }) => {
  const [itemInView, setItemInView] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (itemInView < videos.length - 1) setItemInView(itemInView + 1);
    },
    onSwipedRight: () => {
      if (itemInView > 0) setItemInView(itemInView - 1);
    },
  });

  const removeVideos = useCallback(() => {
    setShow(false);
    document.body.style.overflow = 'auto';
  }, [setShow]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('click', removeVideos);
    return () => {
      window.removeEventListener('click', removeVideos);
    };
  }, [removeVideos]);

  return createPortal(
    <div {...handlers} className={style.videoPlayerWrapper}>
      <CloseIcon
        className={style.close}
        height="1rem"
        width="1rem"
        strokeColor="var(--white)"
      />
      <div {...handlers} className={style.videoPlayer}>
        <h1 onClick={e => e.stopPropagation()}>
          {`${videos[itemInView].name} (${videos[itemInView].type})
          (${itemInView + 1} / ${videos.length})`}
        </h1>
        <div>
          <YouTube
            {...handlers}
            className={style.player}
            videoId={videos[itemInView].key}
            opts={{
              width: document.documentElement.clientWidth,
              height: 250,
              playerVars: {
                autoplay: 1,
                fs: 0,
                modestbranding: 1,
                playsinline: 1,
              },
            }}
            onEnd={() => {
              if (itemInView === videos.length - 1) setItemInView(0);
              else setItemInView(itemInView + 1);
            }}
          />
        </div>
        <p className={style.guide}>
          Swipe <strong>Left</strong> or <strong>Right</strong> to change the
          video
        </p>
        <p className={style.guide}>
          or <strong>Tap</strong> to close the player
        </p>
      </div>
    </div>,
    document.querySelector('#video-player')
  );
};

export default VideoPlayer;
