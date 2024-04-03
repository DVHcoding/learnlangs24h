import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDUQeWtc9lQ3i0inWuGFvKO4301l5fjHRs',
    authDomain: 'learnlangs24h-6fadb.firebaseapp.com',
    projectId: 'learnlangs24h-6fadb',
    storageBucket: 'learnlangs24h-6fadb.appspot.com',
    messagingSenderId: '859315434708',
    appId: '1:859315434708:web:8a8a20abca4c3c9ab37741',
    measurementId: 'G-4Y3N8ML42D',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
