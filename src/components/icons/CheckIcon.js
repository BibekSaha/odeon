import React from 'react';

const CheckIcon = ({ height, width, strokeColor }) => {
  return (
    <svg
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
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

export default CheckIcon;
