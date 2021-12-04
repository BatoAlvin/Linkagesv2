// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
  });
  
  const db = getFirestore();
  const storage = getStorage(firebaseApp);
  //   const db = !firebase.apps.length   ? firebase.initializeApp(config).firestore()  : firebase.app().firestore();
//   const storage = !firebase.apps.length   ? firebase.initializeApp(config).storage()  : firebase.app().storage();
  export{
    db,
    storage
      };