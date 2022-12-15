import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCfJsHwF9ExwPIs3pBj5ROItkZPetCLpsg",
  authDomain: "desafio4-eff42.firebaseapp.com",
  projectId: "desafio4-eff42",
  storageBucket: "desafio4-eff42.appspot.com",
  messagingSenderId: "265574577929",
  appId: "1:265574577929:web:c1d031ef43fb403970c5d8",
  measurementId: "G-HY3NHXS84W"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };