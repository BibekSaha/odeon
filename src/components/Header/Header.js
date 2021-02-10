import React from 'react';
import { useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import OdeonLogo from '../icons/OdeonLogo';
import style from './Header.module.css';

const Header = ({ inlineStyle }) => {
  const isHomePage = useLocation();

  return (
    <div style={inlineStyle} className={style.headerWrapper}>
      {/* <h1 className={style.header}>Odeon</h1> */}
      <a className={style.highlight} rel="noopener noreferrer" target="_blank" href="https://hover.ml/"><OdeonLogo width="8rem" /></a>
      {isHomePage.pathname === '/' && (
        <Dropdown className={style.headerDropdown} />
      )}
    </div>
  );
};

export default Header;
