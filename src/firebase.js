import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDxg7K5TF8P-HP5IceCgiui1Hi_ytcgwO0',
  authDomain: 'just-testing-application.firebaseapp.com',
  databaseURL: 'https://just-testing-application.firebaseio.com',
  projectId: 'just-testing-application',
  storageBucket: 'just-testing-application.appspot.com',
  messagingSenderId: '460067832600',
  appId: '1:460067832600:web:f49930088ea6165b22546d',
  measurementId: 'G-MEL4RWNV78',
};

firebase.initializeApp(firebaseConfig);

export default firebase;