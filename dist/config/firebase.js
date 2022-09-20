"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("@firebase/firestore");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'coder-node.firebaseapp.com',
    projectId: 'coder-node',
    storageBucket: 'coder-node.appspot.com',
    messagingSenderId: '1039685905642',
    appId: '1:1039685905642:web:548b9857db188d2239fb93',
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(app);
