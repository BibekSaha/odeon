import React from 'react';
import Loader from 'react-loader-spinner';
import firebase from '../../firebase';
import 'firebase/auth';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './Account.module.css';

const Account = ({ auth }) => {
  const history = useHistory();

  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push('/');
  };

  if (auth.isSignedIn === null)
    return (
      <Loader
        className={style.loading}
        type="TailSpin"
        color="var(--white)"
        height={80}
        width={80}
      />
    );
  else if (auth.isSignedIn === true)
    return (
      <div className={style.wrapper}>
        <div>
          <img src={auth.props.photoURL} alt={auth.props.displayName} />
          <h2>{auth.props.displayName}</h2>
          <p>{auth.props.email}</p>
          <div onClick={handleSignOut} className={style.signOut}>Sign Out</div>
        </div>
      </div>
    );
  else return <Redirect to="/login?redirect=account" />;
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Account);
