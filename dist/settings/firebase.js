"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("@firebase/firestore");
var firebaseConfig = {
    apiKey: 'AIzaSyDybj1xEz9PM9Nl1Gcvbh8p-PccLICXrSY',
    authDomain: 'coder-node.firebaseapp.com',
    projectId: 'coder-node',
    storageBucket: 'coder-node.appspot.com',
    messagingSenderId: '1039685905642',
    appId: '1:1039685905642:web:548b9857db188d2239fb93'
};
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(app);
