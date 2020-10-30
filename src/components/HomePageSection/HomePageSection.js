import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { InView } from 'react-intersection-observer';
import firebase from '../../firebase';
import 'firebase/firestore';
import dateFormatter from '../../utils/date';
import style from './HomePageSection.module.css';
import BookMarkAddIcon from '../icons/BookMarkAddIcon';
import addToWatchlistAction from '../../actions/watchlistActions';
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
  const db = React.useRef(null);

  useEffect(() => {
    db.current = firebase.firestore();
  }, []);

  useEffect(() => {
    if (state.results.length) return;
    const getMovies = async () => await action();
    getMovies();
  }, [action, state.results.length]);

  const renderList =
    !!Object.keys(state.results).length &&
    state.results.map((movie, i) => (
      <InView
        as="div"
        key={movie.id}
        onChange={inView => {
          if (inView) {
            setCurrent(movie);
            if (i === state.results.length - 1) setTimeout(action, 1000);
          }
        }}
        className={`${style.homePageSectionItem}`}
        threshold={0.7}
      >
        <BookMarkAddIcon
          height="3rem"
          width="3rem"
          strokeColor={watchlist[movie.id] ? 'blue' : 'var(--netflix-red)'}
          className={style.bookMarkAddIcon}
          onClick={() => {
            const docRef = db.current.collection('users').doc(auth.props.uid);
            if (watchlist[movie.id]) {
              return docRef.update({
                [movie.id]: firebase.firestore.FieldValue.delete()
              })
              // .then(() => console.log('deleted!!!!'));
            }
            const timestamp = Date.now();
            // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const id = movie.id;
            docRef
              .set(
                { [id]: { timestamp, id } },
                { merge: true }
              )
              .then(() => addToWatchlistAction({ id, timestamp }))
              .catch(err => console.log(err));
          }}
        />
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={style.homePageSectionItem_image}
          effect="blur"
          threshold="500"
          onClick={() => {
            history.push(`/${type}/${current.id}`);
          }}
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
