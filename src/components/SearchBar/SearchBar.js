import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '../icons/SearchIcon';
import CloseIcon from '../icons/CloseIcon';
import style from './SearchBar.module.css';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // const timer = setTimeout(() => setDebouncedTerm(term), 800);
    timerRef.current = setTimeout(
      () =>
        term.trim() && history.push(`/search?q=${term.trim().toLowerCase()}`),
      800
    );
    return () => clearTimeout(timerRef.current);
  }, [term, history]);

  return (
    <div className={style.inputWrapper}>
      <SearchIcon
        height="1.2rem"
        width="1.2rem"
        strokeColor="var(--muted)"
        className={style.searchIcon}
      />
      <form>
        <input
          value={term}
          onChange={e => setTerm(e.target.value)}
          ref={inputRef}
          // onFocus={() => { window.isFocused = true; }}
          // onBlur={() => { window.isFocused = false; }}
          // className={className}
          className={style.focusedInput}
          placeholder="Movies, Geners, Actors..."
          type="text"
        />
      </form>
      {!!term && (
        <CloseIcon
          height="1.1rem"
          width="1.1rem"
          strokeColor="var(--muted)"
          className={style.closeIcon}
          onClick={() => {
            setTerm('');
            inputRef.current.focus();
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
