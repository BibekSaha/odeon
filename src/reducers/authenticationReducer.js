import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  props: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { isSignedIn: true, props: { ...action.payload } };
    case SIGN_OUT:
      return { isSignedIn: false, props: null };
    default:
      return state;
  }
};