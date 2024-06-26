import React from 'react';

const WatchlistIcon = ({ height, width, strokeColor }) => (
  <svg
    height={height}
    width={width}
    stroke="none"
    fill={strokeColor}
    viewBox="0 0 20 20"
  >
    <path d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z" />
  </svg>
);

export default WatchlistIcon;
