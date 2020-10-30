import React from 'react';
import { useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import style from './Header.module.css';

const Header = ({ inlineStyle }) => {
  const isHomePage = useLocation();

  return (
    <div style={inlineStyle} className={style.headerWrapper}>
      <h1 className={style.header}>Lemon Milk</h1>
      {isHomePage.pathname === '/' && (
        <Dropdown className={style.headerDropdown} />
      )}
    </div>
  );
};

export default Header;
