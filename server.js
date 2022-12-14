'use strict';
require('dotenv').config();

// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Constants
const http = require('http');
const iApp = require('./app');

const PORT = process.env.DEFAULT_PORT;
const HOST = '0.0.0.0';

const server = http.createServer(iApp);

server.listen(PORT, HOST)
console.log(`Running on https://${HOST}:${PORT}`);