import React from 'react';
import style from './InformationWrapper.module.css';

const InformationWrapper = ({ children }) => (
  <div className={style.wrapper}>{children}</div>
);

export default InformationWrapper;
