import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dateFormatter from '../../utils/date';
import style from './SearchResults.module.css';

const SearchResults = ({ debouncedTerm }) => {
  const history = useHistory();
  const [searchResults, setSearchResults] = useState(null);
  const termRef = useRef(debouncedTerm);

  useEffect(() => {
    if (debouncedTerm && termRef.current !== debouncedTerm)
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TOKEN}&language=en-US&query=${debouncedTerm}&page=1&include_adult=false`
      )
        .then(resp => resp.json())
        .then(resp => { 
          setSearchResults(resp);
          termRef.current = debouncedTerm;
        });
  }, [debouncedTerm]);

  const renderList =
    !!searchResults &&
    searchResults.results.map(result => {
      if (result.media_type === 'person') {
        return (
          result.profile_path && (
            <React.Fragment key={result.id}>
              <div
                onClick={() =>
                  history.push(`/${result.media_type}/${result.id}`)
                }
                className={style.searchResult}
              >
                <LazyLoadImage
                  src={`https://image.tmdb.org/t/p/w200/${result.profile_path}`}
                  alt={result.name}
                  effect="blur"
                  className={style.searchResultPersonImage}
                />
                <div className={style.searchResultDetails}>
                  <h3 className={style.searchHeader}>{result.name}</h3>
                  <br />
                  <p>
                    Known for:{' '}
                    <strong style={{}}>{result.known_for_department}</strong>
                  </p>
                </div>
              </div>
              <div className={style.searchResultPersonKnownWrapper}>
                <div>
                  {result.known_for.map(item => (
                    <div
                      onClick={() =>
                        history.push(`/${item.media_type}/${result.id}`)
                      }
                      key={item.id}
                    >
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                        alt={result.name || result.title}
                        effect="blur"
                        className={style.searchResultPersonKnownImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          )
        );
      }
      const date = result.release_date || result.first_air_date;
      const isSeries = result.media_type === 'tv';

      return (
        !!result.poster_path && (
          <Link
            to={`/${result.media_type}/${result.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
            key={result.id}
          >
            <div
              // onClick={() => history.push(`/${result.media_type}/${result.id}`)}
              className={style.searchResult}
            >
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`}
                alt={result.title || result.name}
                effect="blur"
                className={style.searchResultImage}
              />
              <div className={style.searchResultDetails}>
                <h1 className={style.searchHeader}>
                  {result.name || result.title}
                </h1>
                <br />
                <div>
                  <p>
                    {dateFormatter(date)}
                    {isSeries && ' | TV Series'}
                  </p>
                  <p>
                    <span role="img" aria-label="star">
                      ⭐
                    </span>{' '}
                    {parseFloat(result.vote_average) || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )
      );
    });

  if (searchResults && searchResults.total_results === 0)
    return (
      <div className={style.searchResultNotFound}>
        No Search Results Found....
      </div>
    );
  return <div className={style.searchList}>{renderList}</div>;
};

export default SearchResults;
