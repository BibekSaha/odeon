import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import HomePageNav from '../HomePageNav/HomePageNav';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
// import style from './App.module.css';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePageNav />
            <HomePage />
          </Route>
          <Route exact path="/popular">
            <HomePageNav />
            <div>Popular</div>
          </Route>
        </Switch>
        <NavBar />
      </Router>
    </div>
  );
};

export default App;
