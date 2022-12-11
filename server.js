'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5kujJCSyoF7gWTGV9Eu5GAuQ0c-TrqnU",
    authDomain: "metrodelima.firebaseapp.com",
    projectId: "metrodelima",
    storageBucket: "metrodelima.appspot.com",
    messagingSenderId: "474608806029",
    appId: "1:474608806029:web:a32ba8206a16082ac61ac4",
    measurementId: "G-LHRLT76NYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Constants
const http = require('http');
const app = require('./app');

const PORT = process.env.DEFAULT_PORT;
const HOST = '0.0.0.0';

const server = http.createServer(app);

server.listen(PORT, HOST)
console.log(`Running on https://${HOST}:${PORT}`);