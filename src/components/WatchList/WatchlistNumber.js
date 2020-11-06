import React from 'react';
import { connect } from 'react-redux';

const WatchlistNumber = ({ watchlist }) => {
  const watchlistLength = Object.keys(watchlist).length;
  return (
    <div style={{
      fontSize: '1.1rem',
      color: 'var(--white)'
    }}>{watchlistLength} {watchlistLength > 1 ? 'Items' : 'Item'}</div>
  );
};

const mapStateToProps = ({ watchlist }) => ({ watchlist });

export default connect(mapStateToProps)(WatchlistNumber);