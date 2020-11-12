import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from '../../firebase';
import 'firebase/firestore';
import Header from '../Header/Header';
import HomePageNav from '../HomePageNav/HomePageNav';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
import Search from '../Search/Search';
import MovieDetails from '../MovieDetails/MovieDetails';
import Authentication from '../Authentication/Authentication';
import Account from '../Account/Account';
import WatchList from '../WatchList/WatchList';
import { initAddToWatchlist } from '../../actions/watchlistActions';
import WatchlistContext from '../../context/watchlist';
import style from './App.module.css';

const App = ({ auth, initAddToWatchlist }) => {
  const [isLandscape, setIsLandscape] = useState(
    document.documentElement.clientWidth > 500
  );
  const [watchlistFetched, setWatchlistFetched] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsLandscape(document.documentElement.clientWidth > 500);
      // !window.isFocused && setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
    });
  }, []);

  useEffect(() => {
    if (auth.isSignedIn) {
      const db = firebase.firestore();
      const docRef = db.collection('users').doc(auth.props.uid);
      docRef.get().then(doc => {
        if (doc.exists) initAddToWatchlist(doc.data());
        setWatchlistFetched(true);
      });
      docRef.onSnapshot(doc => {
        // const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
        // console.log(source);
        doc.exists && initAddToWatchlist(doc.data());
      });
    }
  }, [auth, initAddToWatchlist]);

  if (isLandscape)
    return (
      <div className={style.landscapeWrapper}>
        <h1 className={style.landscape}>
          Rotate your device to have the best experience
        </h1>
      </div>
    );

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <HomePageNav />
            <WatchlistContext.Provider value={{ watchlistFetched, auth }}>
              <HomePage />
            </WatchlistContext.Provider>
            <NavBar />
          </Route>
          <Route exact path={['/search', '/search?q=:query']}>
            <Search />
            <NavBar />
          </Route>
          <Route exact path="/watchlist">
            <WatchList watchlistFetched={watchlistFetched} />
            <NavBar />
          </Route>
          <Route exact path="/account">
            <Account />
            <NavBar />
          </Route>
          <Route exact path="/movie/:id">
            <MovieDetails watchlistFetched={watchlistFetched} />
          </Route>
          <Route exact path="/login">
            <Authentication />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = { initAddToWatchlist };

export default connect(mapStateToProps, mapDispatchToProps)(App);
