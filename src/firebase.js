import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCJl-TPic69Ly6Gq9qxWOaVwmbRvAksFFQ',
  authDomain: 'traffic-management-app-3c1a3.firebaseapp.com',
  databaseURL:
    'https://traffic-management-app-3c1a3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'traffic-management-app-3c1a3',
  storageBucket: 'traffic-management-app-3c1a3.appspot.com',
  messagingSenderId: '570437328758',
  appId: '1:570437328758:web:406a23c80af0c4669ae457',
  measurementId: 'G-K7L4300MSQ',
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var database = firebase.database();
var storage = firebase.storage();
var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, database, storage };
