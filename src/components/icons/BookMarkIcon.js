import React from 'react';

const BookMarkIcon = ({ className, height, width, strokeColor, onClick }) => {
  return (
    <svg
      height={height}
      width={width}
      fill={strokeColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      onClick={onClick}
      className={className}
    >
      <path d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2z" />
    </svg>
  );
};

export default BookMarkIcon;
