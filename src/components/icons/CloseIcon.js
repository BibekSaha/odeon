import React from 'react';

const CloseIcon = ({ height, width, strokeColor, className, onClick }) => (
  <svg
    className={className}
    height={height}
    width={width}
    fill={strokeColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    onClick={onClick}
  >
    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
  </svg>
);

export default CloseIcon;
