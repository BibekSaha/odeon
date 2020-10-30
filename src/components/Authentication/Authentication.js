import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInAction } from '../../actions/authenticationAction';
import style from './Authentication.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Authentication = ({ auth, signInAction }) => {
  const history = useHistory();

  useEffect(() => {
    if (auth.isSignedIn) history.push('/');
  }, [auth.isSignedIn, history]);

  const handleOnClick = async () => {
    const firebase = await import('firebase/app');
    await import('firebase/auth');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    try {
      // await firebase.auth().signInWithRedirect(provider);
      // const { user } = firebase.auth().getRedirectResult();
      // console.log(user);
      // signInAction(user);
      const { user } = await firebase.auth().signInWithPopup(provider);
      // console.log(user);
      signInAction(user);
    } catch (err) {
      console.log(err);
    }
  };

  return auth.isSignedIn === false ? (
    <div className={style.wrapper}>
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><h1 className={style.header}>Lemon Milk</h1></Link>
        <div onClick={handleOnClick} className={style.gSignInButton}>
          <div className={style.contentWrapper}>
            <div className={style.logoWrapper}>
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="google"
              />
            </div>
            <span className={style.textContainer}>
              <span>Sign in with Google</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader
      className={style.loading}
      type="TailSpin"
      color="var(--white)"
      height={80}
      width={80}
    />
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { signInAction })(Authentication);
