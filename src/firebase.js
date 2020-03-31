import firebase from 'firebase';
import React from 'react';

class Firebase {
    config = {
        apiKey: "AIzaSyCVXi7MSmaFcSDtvK2eYdpggzQgbHOf_dk",
        authDomain: "onlymid-6adbf.firebaseapp.com",
        databaseURL: "https://onlymid-6adbf.firebaseio.com",
        projectId: "onlymid-6adbf",
        storageBucket: "onlymid-6adbf.appspot.com",
        messagingSenderId: "464340805319",
        appId: "1:464340805319:web:65283996aefc809d2800e2"
    };

    constructor() {
        firebase.initializeApp(this.config);
    }
}


export {
    firebase,
    Firebase,
};
