import React from 'react';
import Loader from 'react-loader-spinner';
import CheckIcon from '../../icons/CheckIcon';
import PlusIcon from '../../icons/PlusIcon';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './WatchlistButton.module.css';

const WatchlistButton = ({ isPresent, onClick, auth, watchlistFetched }) => {
  return (
    <div
      className={`${style.watchlistButtonWrapper} ${
        !isPresent && style.watchlistItemNotPresent
      }`}
    >
      {(auth.isSignedIn && !watchlistFetched) || auth.isSignedIn === null ? (
        <Loader type="TailSpin" color="var(--primary)" height={20} width={20} />
      ) : (
        <div onClick={onClick} className={style.watchlistTextFormatter}>
          {isPresent ? (
            <CheckIcon width="1.5rem" height="1.5rem" strokeColor="gray" />
          ) : (
            <PlusIcon
              width="1.5rem"
              height="1.5rem"
              strokeColor="var(--primary)"
            />
          )}
          <strong>
            {isPresent ? 'Added to Watchlist' : 'Add to Watchlist'}
          </strong>
        </div>
      )}
    </div>
  );
};

export default WatchlistButton;
