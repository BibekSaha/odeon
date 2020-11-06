import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const query = useQuery();
  
  // useEffect(() => () =>
  //   debouncedTerm &&
  //   window.history.pushState({}, '', `/search/q=${debouncedTerm}`),
  //   [debouncedTerm]
  // );

  useEffect(() => {
    setDebouncedTerm(query.get('q'));
  }, [query]);

  return (
    <div>
      <SearchBar setDebouncedTerm={setDebouncedTerm} />
      <SearchResults debouncedTerm={debouncedTerm} />
    </div>
  );
};

export default Search;
