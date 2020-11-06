import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import WatchlistSelector from './WatchlistSelector';
import FilterIcon from '../icons/FilterIcon';

const WatchlistFilter = ({ setFilter }) => {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setShowSelector(true);
          window.navigator.vibrate(40);
        }}
      >
        <FilterIcon height="1.5rem" width="1.5rem" strokeColor="var(--muted)" />
      </div>
      {showSelector &&
        createPortal(
          <WatchlistSelector
            show={showSelector}
            setShow={setShowSelector}
            setFilter={setFilter}
          />,
          document.querySelector('#watchlist-filter')
        )}
    </>
  );
};

export default WatchlistFilter;
