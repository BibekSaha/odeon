import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { InView } from 'react-intersection-observer';
import Loader from 'react-loader-spinner';
import BookMark from '../BookMark/BookMark';
import Placeholder from '../Placeholder/Placeholder';
import StarIcon from '../icons/StarIcon';
import handleWatchlist from '../../utils/handleWatchlist';
import dateFormatter from '../../utils/date';
import formatTitle from '../../utils/formatTitle';
import hashid from '../../utils/hashid'
import style from './HomePageSection.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import 'react-lazy-load-image-component/src/effects/blur.css';

const HomePageSection = ({ action, state, type, auth, watchlist, homePage }) => {
  const history = useHistory();
  const [current, setCurrent] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (state.results.length) return;
    setShowLoader(true);
    const getMovies = async () => await action();
    getMovies().then(() => setShowLoader(false));
  }, [action, state.results.length]);

  const renderList =
    !!state.results.length &&
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
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt={item.title}
          className={style.homePageSectionItem_image}
          // effect="blur"
          // threshold="500"
          onClick={() => {
            history.push(`/${type}/${hashid.encode(item.id)}`);
          }}
          placeholder={<Placeholder />}
        />
        <BookMark
          height="2rem"
          width="2rem"
          strokeColor={'var(--light-muted)'}
          bookmarked={!!watchlist[item.id]}
          onClick={() => {
            if (!auth.isSignedIn) return history.push('/login');
            handleWatchlist(auth, watchlist, item, type);
          }}
        />
      </InView>
    ));

  const renderDetails = !!Object.keys(current).length && (
    <>
      <h1
        onClick={() => {
          history.push(`/${type}/${hashid.encode(current.id)}`);
        }}
      >
        {current.title || current.name}
      </h1>
      <h3>{dateFormatter(current.release_date || current.first_air_date)}</h3>
      <h3
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StarIcon height="1.1rem" width="1.1rem" strokeColor="var(--star-yellow)" /> &nbsp;
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
      <Helmet>
        <title>{formatTitle(homePage.currentTab)} | Odeon</title>
      </Helmet>
      <div className={style.homePageSectionWrapper}>{renderList}</div>
      <div className={style.homePageSectionDetails}>{renderDetails}</div>
    </div>
  );
};

const mapStateToProps = ({ auth, watchlist, homePage }) => ({ auth, watchlist, homePage });

export default connect(mapStateToProps)(HomePageSection);
