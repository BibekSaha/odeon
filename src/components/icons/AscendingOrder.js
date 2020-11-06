import React from 'react';

const AscendingOrder = ({ height, width, strokeColor, onClick }) => (
  <svg
    onClick={onClick}
    className="w-6 h-6"
    fill="none"
    height={height}
    width={width}
    stroke={strokeColor}
    // stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
    />
  </svg>
);


export default AscendingOrder;

// this react component could be easily implemented as import { ReactComponent as SomeOtherReactName } from 'somewhere';