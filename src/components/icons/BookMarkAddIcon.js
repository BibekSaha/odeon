import React from 'react';

const BookMarkAddIcon = ({ className, height, width, strokeColor, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill={strokeColor}
      className={className}
      viewBox="0 0 20 20"
      onClick={onClick}
    >
      <path d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2zm2 0v15l6-3 6 3V2H4zm5 5V5h2v2h2v2h-2v2H9V9H7V7h2z" />
    </svg>
  );
};

export default BookMarkAddIcon;
