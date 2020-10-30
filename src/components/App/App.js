import React, { useEffect } from 'react';
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

const App = ({ auth, initAddToWatchlist }) => {
  useEffect(() => {
    if (auth.isSignedIn) {
      const db = firebase.firestore();
      const docRef = db.collection('users').doc(auth.props.uid);
      docRef.get().then(doc => doc.exists && initAddToWatchlist(doc.data()));
      docRef.onSnapshot(doc => {
        // const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
        // console.log(source);
        doc.exists && initAddToWatchlist(doc.data());
      });
    }
  }, [auth, initAddToWatchlist]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <HomePageNav />
            <HomePage />
            <NavBar />
          </Route>
          <Route exact path={['/search', '/search?q=:query']}>
            <Search />
            <NavBar />
          </Route>
          <Route exact path="/watchlist">
            <WatchList />
            <NavBar />
          </Route>
          <Route exact path="/account">
            <Account />
            <NavBar />
          </Route>
          <Route exact path="/movie/:id">
            <MovieDetails />
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
