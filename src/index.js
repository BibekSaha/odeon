import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from './firebase';
import 'firebase/auth';
import reducers from './reducers';
import './index.css';
import App from './components/App/App';
import { signInAction, signOutAction } from './actions/authenticationAction';
import * as serviceWorker from './serviceWorker';
import resetAction from './actions/resetAction';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const FirebaseAppWrapper = ({ children }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) store.dispatch(signInAction(user));
      else {
        store.dispatch(signOutAction());
        store.dispatch(resetAction());
      }
    });
  }, []);

  return children;
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </FirebaseAppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
