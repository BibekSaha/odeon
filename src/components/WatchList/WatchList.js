import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import 'firebase/firestore';
import Loader from 'react-loader-spinner';
import WatchlistNumber from './WatchlistNumber';
import WatchlistOrder from './WatchlistOrder';
import WatchlistFilter from './WatchlistFilter';
import ItemBlock from '../ItemBlock/ItemBlock';
import CloseIcon from '../icons/CloseIcon';
import filterWatchlist, {
  filterIndex,
  sortByOrder,
} from '../../utils/filteredWatchlist';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './WatchList.module.css';

const WatchList = ({ auth, watchlist, watchlistFetched }) => {
  const history = useHistory();
  const [shouldRedirect, setShouldRedirect] = useState(null);
  const animationClass = useRef(style.animation);
  const [isAscending, setIsAscending] = useState(
    !!+window.localStorage.getItem('watchlist-order') || false
  );
  const [watchlistFiltered, setWatchlistFiltered] = useState(
    Object.values(watchlist)
  );
  const [filter, setFilter] = useState(
    +window.localStorage.getItem('watchlist-filter') || 1
  );

  const db = useRef(null);
  useEffect(() => {
    db.current = firebase.firestore();
  }, []);

  const memoizedFilteredWatchlist = useCallback(() => {
    let filteredWatchlist = filterWatchlist(watchlist, filter);
    sortByOrder(filteredWatchlist, isAscending);
    setWatchlistFiltered(filteredWatchlist);
    return () => {
      animationClass.current = '';
    };
  }, [watchlist, filter, isAscending]);

  useEffect(memoizedFilteredWatchlist, [memoizedFilteredWatchlist]);

  useEffect(() => {
    if (auth.isSignedIn === false) setShouldRedirect(true);
  }, [auth.isSignedIn, history]);

  if (shouldRedirect) return <Redirect to="/login?redirect=watchlist" />;
  else if (auth.isSignedIn === null || !watchlistFetched)
    return (
      <Loader
        className={style.loading}
        type="TailSpin"
        color="var(--white)"
        height={80}
        width={80}
      />
    );
  else if (!watchlistFiltered.length)
    return <div className={style.notFound}>Your Watchlist is Empty!!</div>;
  else
    return (
      <div className={style.watchlistWrapper}>
        <div className={style.settingsWrapper}>
          <div>
            <WatchlistNumber />
            <p>Sorted by: {filterIndex[filter]}</p>
          </div>
          <div className={style.settingsIcons}>
            <div>
              <WatchlistOrder
                isAscending={isAscending}
                setIsAscending={setIsAscending}
              />
            </div>
            <div>
              <WatchlistFilter setFilter={setFilter} />
            </div>
          </div>
        </div>
        <LazyLoadComponent>
          {watchlistFiltered.map((item, i) => (
            <div
            key={item.props.id}
            className={`${style.itemWrapper} ${
              i < 7 && animationClass.current
            }`}
            >
              <ItemBlock {...item.props} />
              <div
                onClick={e => {
                  e.stopPropagation();
                  const docRef = db.current
                    .collection('users')
                    .doc(auth.props.uid);
                  docRef.update({
                    [item.props.id]: firebase.firestore.FieldValue.delete(),
                  });
                }}
                className={style.itemRemove}
              >
                <CloseIcon
                  height="1rem"
                  width="1rem"
                  strokeColor="var(--muted)"
                />
              </div>
            </div>
          ))}
        </LazyLoadComponent>
      </div>
    );
};

const mapStateToProps = ({ auth, watchlist }) => ({ auth, watchlist });

export default connect(mapStateToProps)(WatchList);
