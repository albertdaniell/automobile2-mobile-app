import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyA9dhoCwWVUTTs_ctv3LMqbAGfTvPGNASE",
    authDomain: "automobile-a783f.firebaseapp.com",
    databaseURL: "https://automobile-a783f.firebaseio.com",
    projectId: "automobile-a783f",
    storageBucket: "automobile-a783f.appspot.com",
    messagingSenderId: "786691647189",
    appId: "1:786691647189:web:78d30f9f3b2536a4"
};
firebase.initializeApp(config);



export default firebase;