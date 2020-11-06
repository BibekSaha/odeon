import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { InView } from 'react-intersection-observer';
import Loader from 'react-loader-spinner';
import firebase from '../../firebase';
import 'firebase/firestore';
import dateFormatter from '../../utils/date';
import style from './HomePageSection.module.css';
// import BookMarkAddIcon from '../icons/BookMarkAddIcon';
import addToWatchlistAction from '../../actions/watchlistActions';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import BookMark from '../BookMark/BookMark';
// import 'react-lazy-load-image-component/src/effects/blur.css';

const HomePageSection = ({
  action,
  state,
  type,
  auth,
  watchlist,
  addToWatchlistAction,
}) => {
  const history = useHistory();
  const [current, setCurrent] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const db = React.useRef(null);

  useEffect(() => {
    db.current = firebase.firestore();
  }, []);

  useEffect(() => {
    if (state.results.length) return;
    setShowLoader(true);
    const getMovies = async () => await action();
    getMovies().then(() => setShowLoader(false));
  }, [action, state.results.length]);

  const renderList =
    !!Object.keys(state.results).length &&
    state.results.map((item, i) => (
      <InView
        as="div"
        key={item.id}
        onChange={inView => {
          if (inView) {
            setCurrent(item);
            if (i === state.results.length - 1) setTimeout(action, 1000);
          }
        }}
        className={`${style.homePageSectionItem}`}
        threshold={0.7}
      >
        <BookMark
          height="2rem"
          width="2rem"
          strokeColor={'var(--light-muted)'}
          bookmarked={!!watchlist[item.id]}
          // strokeColor={watchlist[item.id] ? 'blue' : 'var(--netflix-red)'}
          onClick={() => {
            if (!auth.isSignedIn) return history.push('/login');
            const docRef = db.current.collection('users').doc(auth.props.uid);
            if (watchlist[item.id]) {
              return docRef.update({
                [item.id]: firebase.firestore.FieldValue.delete(),
              });
              // .then(() => console.log('deleted!!!!'));
            }
            const timestamp = Date.now();
            // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const id = item.id;
            docRef
              .set(
                {
                  [id]: {
                    timestamp,
                    props: {
                      id: item.id,
                      media_type: type,
                      release_date: item.release_date || item.first_air_date,
                      poster_path: item.poster_path,
                      vote_average: item.vote_average,
                      genre_ids: item.genre_ids,
                      title: item.title || item.name,
                    },
                  },
                },
                { merge: true }
              )
              .then(() =>
                addToWatchlistAction({
                  timestamp,
                  props: {
                    id: item.id,
                    media_type: type,
                    release_date: item.release_date || item.first_air_date,
                    poster_path: item.poster_path,
                    vote_average: item.vote_average,
                    genre_ids: item.genre_ids,
                    title: item.title || item.name,
                  },
                })
              )
              .catch(err => console.log(err));
          }}
        />
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt={item.title}
          className={style.homePageSectionItem_image}
          // effect="blur"
          threshold="500"
          onClick={() => {
            history.push(`/${type}/${current.id}`);
          }}
          // placeholder={<Placeholder />}
        />
      </InView>
    ));

  const renderDetails = !!Object.keys(current).length && (
    <>
      <h1
        onClick={() => {
          history.push(`/${type}/${current.id}`);
        }}
      >
        {current.title || current.name}
      </h1>
      <h3>{dateFormatter(current.release_date || current.first_air_date)}</h3>
      <h3>
        <span role="img" aria-label="star">
          ⭐
        </span>{' '}
        {parseFloat(current.vote_average) || 'N/A'}
      </h3>
    </>
  );

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

  return (
    <div>
      <div className={style.homePageSectionWrapper}>{renderList}</div>
      <div className={style.homePageSectionDetails}>{renderDetails}</div>
    </div>
  );
};

const mapStateToProps = ({ auth, watchlist }) => ({ auth, watchlist });
const mapDispatchToProps = { addToWatchlistAction };

export default connect(mapStateToProps, mapDispatchToProps)(HomePageSection);
