import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '../icons/SearchIcon';
import CloseIcon from '../icons/CloseIcon';
import style from './SearchBar.module.css';

const SearchBar = ({ setDebouncedTerm }) => {
  // const [className, setClassName] = useState(style.notFocusedInput);
  const [term, setTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(term), 800);
    return () => clearTimeout(timer);
  }, [term, setDebouncedTerm]);

  return (
    <div className={style.inputWrapper}>
      <SearchIcon
        height="1.2rem"
        width="1.2rem"
        strokeColor="var(--muted)"
        className={style.searchIcon}
      />
      <input
        value={term}
        onChange={e => {
          setTerm(e.target.value);
          if (e.target.value)
            window.history.pushState({}, '', `/search?q=${e.target.value}`);
        }}
        ref={inputRef}
        // onFocus={() => setClassName(style.focusedInput)}
        // onBlur={() => setClassName(style.notFocusedInput)}
        // className={className}
        className={style.focusedInput}
        placeholder="Movies, Geners, Actors..."
        type="text"
      />
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
