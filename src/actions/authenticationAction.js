import { SIGN_IN, SIGN_OUT } from './types';

export const signInAction = ({ uid, displayName, email, photoURL }) => ({
  type: SIGN_IN,
  payload: { uid, displayName, email, photoURL }
});

export const signOutAction = () => ({ type: SIGN_OUT });