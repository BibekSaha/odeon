import React from 'react';

const DescendingOrder = ({ height, width, strokeColor, onClick }) => {
  return (
    <svg
      onClick={onClick}
      height={height}
      width={width}
      stroke={strokeColor}
      fill="none"
      // stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
      />
    </svg>
  );
};

export default DescendingOrder;
