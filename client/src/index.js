import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import FirebaseHandler from './utils/FirebaseHandler';
import AppColours from './constants/appColors';

// Firebase app needs to be initalized before the virtual DOM is built.
FirebaseHandler.initializeFirebase();

// Set dark mode at launch, according to key in local storage.
AppColours.setDarkModeEnabled(AppColours.getDarkModeEnabled(), true);

ReactDOM.render(<App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
