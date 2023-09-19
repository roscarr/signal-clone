import { getApp, getApps, initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCKNxeYabGwLnys4mpU8POZJB-2w8zlrHY",
    authDomain: "tinder-clone-73491.firebaseapp.com",
    projectId: "tinder-clone-73491",
    storageBucket: "tinder-clone-73491.appspot.com",
    messagingSenderId: "488675122213",
    appId: "1:488675122213:web:5d03e0ca9a01431115f3cc"
  };


let app;
if (getApps.length===0) {
  app = initializeApp(firebaseConfig);
} else {
  app=getApp()
}

//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export {db,auth}