import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import BookMarkAddIcon from '../icons/BookMarkAddIcon';
import BookMarkIcon from '../icons/BookMarkIcon';
import WatchlistContext from '../../context/watchlist';
import style from './BookMark.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const BookMark = ({ height, width, strokeColor, onClick, bookmarked }) => {
  const [animationClass, setAnimationClass] = React.useState('');
  const context = useContext(WatchlistContext);

  let renderItem;
  if (
    (context.auth.isSignedIn && !context.watchlistFetched) ||
    context.auth.isSignedIn === null
  ) {
    renderItem = (
      <Loader type="ThreeDots" color="var(--muted)" height={25} width={25} />
    );
  } else if (bookmarked) {
    renderItem = (
      <BookMarkIcon
        height={height}
        width={width}
        strokeColor={'var(--blue)'}
        onClick={() => {
          window.navigator.vibrate(40);
          setAnimationClass(style.animation);
          onClick();
        }}
        className={`${style.bookMarkIcon} ${animationClass || ''}`}
      />
    );
  } else if (!bookmarked || !context.auth.isSignedIn) {
    renderItem = (
      <BookMarkAddIcon
        height={height}
        width={width}
        strokeColor={strokeColor}
        onClick={() => {
          window.navigator.vibrate(40);
          setAnimationClass(style.animation);
          onClick();
        }}
        className={`${style.bookMarkAddIcon} ${animationClass || ''}`}
      />
    );
  } else return null;

  return <div className={style.bookMarkWrapper}>{renderItem}</div>;
};
export default BookMark;