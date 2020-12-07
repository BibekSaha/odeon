import React from 'react';
import style from './DetailsSection.module.css';

const DetailsSections = ({ children }) => <div className={style.section}>{children}</div>;

export default DetailsSections;