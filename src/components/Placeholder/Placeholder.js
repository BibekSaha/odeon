import React from 'react';
import style from './Placeholder.module.css';

const Placeholder = ({
  width = '70vw',
  paddingTop = '150%',
  borderRadius = '10px',
  backgroundColor = 'var(--heavy-muted)',
}) => {
  return (
    <div className={style.placeholder} style={{ width, paddingTop, borderRadius, backgroundColor }}></div>
  );
};

export default Placeholder;
