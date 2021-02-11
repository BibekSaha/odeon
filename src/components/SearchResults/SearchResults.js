import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loader from 'react-loader-spinner';
import ItemBlock from '../ItemBlock/ItemBlock';
import hashid from '../../utils/hashid';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './SearchResults.module.css';

const SearchResults = ({ debouncedTerm }) => {
  const history = useHistory();
  const [searchResults, setSearchResults] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (debouncedTerm) {
      setShowLoader(true);
      fetch(
        `https://api.odeon.tk/search/multi?language=en-US&query=${debouncedTerm}&page=1&include_adult=false`
      )
        .then(resp => resp.json())
        .then(resp => {
          setSearchResults(resp);
          setShowLoader(false);
        });
    }
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
                  history.push(`/${result.media_type}/${hashid.encode(result.id)}`)
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
                    Known for: <strong>{result.known_for_department}</strong>
                  </p>
                </div>
              </div>
              <div className={style.searchResultPersonKnownWrapper}>
                <div>
                  {result.known_for.map(item => (
                    <div
                      onClick={() =>
                        history.push(`/${item.media_type}/${item.id}`)
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

      result.release_date = result.release_date || result.first_air_date;
      return !!result.poster_path && <ItemBlock key={result.id} {...result} />;
    });

  if (showLoader)
    return (
      <Loader
        className={style.loading}
        type="TailSpin"
        color="var(--white)"
        height={80}
        width={80}
      />
    );

  if (searchResults && searchResults.total_results === 0)
    return (
      <div className={style.searchResultNotFound}>
        No Search Results Found....
      </div>
    );
  return <div className={style.searchList}>{renderList}</div>;
};

export default SearchResults;
