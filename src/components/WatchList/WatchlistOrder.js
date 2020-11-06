import React from 'react';
import AscendingOrder from '../icons/AscendingOrder';
import DescendingOrder from '../icons/DescendingOrder';

const WatchlistOrder = ({ isAscending, setIsAscending }) => {
  if (isAscending)
    return (
      <AscendingOrder
        onClick={() => {
          window.navigator.vibrate(40);
          setIsAscending(false);
          window.localStorage.setItem('watchlist-order', 0);
        }}
        height="1.5rem"
        width="1.5rem"
        strokeColor="var(--light-muted)"
      />
    );
  else
    return (
      <DescendingOrder
        onClick={() => {
          window.navigator.vibrate(40);
          setIsAscending(true);
          window.localStorage.setItem('watchlist-order', 1);
        }}
        height="1.5rem"
        width="1.5rem"
        strokeColor="var(--light-muted)"
      />
    );
};

export default WatchlistOrder;
