import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';
import HomeIcon from '../icons/HomeIcon';
import SearchIcon from '../icons/SearchIcon';
import WatchlistIcon from '../icons/WatchlistIcon';
import UserIcon from '../icons/UserIcon';

const NavBar = () => {
  return (
    <div className={style.navBar}>
      <NavLink exact activeClassName={style.selectedFirstPart} to="/">
        <HomeIcon height="2rem" width="2rem" strokeColor="var(--muted)" />
      </NavLink>
      <NavLink exact activeClassName={style.selectedFirstPart} to="/search">
        <SearchIcon height="2rem" width="2rem" strokeColor="var(--muted)" />
      </NavLink>
      <NavLink exact activeClassName={style.selectedSecondPart} to="/watchlist">
        <WatchlistIcon height="2rem" width="2rem" strokeColor="var(--muted)" />
      </NavLink>
      <NavLink exact activeClassName={style.selectedSecondPart} to="/account">
        <UserIcon height="2rem" width="2rem" strokeColor="var(--muted)" />
      </NavLink>
    </div>
  );
};

export default NavBar;
