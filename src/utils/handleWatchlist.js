import firebase from '../firebase';
import 'firebase/firestore';
import store from '../store';
import addToWatchlistAction from '../actions/watchlistActions';

export default (auth, watchlist, item, type) => {
  const docRef = firebase.firestore().collection('users').doc(auth.props.uid),
    id = item.id;

  if (watchlist[id]) {
    return docRef.update({
      [item.id]: firebase.firestore.FieldValue.delete(),
    });
  }

  const timestamp = Date.now(),
    watchlistItem = {
      timestamp,
      props: {
        id: item.id,
        media_type: type,
        release_date: item.release_date || item.first_air_date,
        poster_path: item.poster_path,
        genre_ids: item.genre_ids || item.genres,
        vote_average: item.vote_average,
        title: item.title || item.name,
      },
    };

  docRef
    .set({ [id]: watchlistItem }, { merge: true })
    .then(() => store.dispatch(addToWatchlistAction(watchlistItem)))
    .catch(err => console.log(err));
};
