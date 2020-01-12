import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "YOURFIREBASEAPI",
    authDomain: "YOURFIREBASEAUTHDOMAIN",
    databaseURL: "YOURFIREBASEDATABASEURL",
    projectId: "YOURFIREBASEPROJECTID",
    storageBucket: "YOURFIREBASESTORAGEBUCKET",
    messagingSenderId: "YOURFIREBASEMESSAGINGSENDERID"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const auth = firebase.auth();
const db = firebase.firestore();

export {
    db,
    auth
}
