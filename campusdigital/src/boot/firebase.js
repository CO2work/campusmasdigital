import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyATxEITqADQg6vPTm6ZpibHbcqRXu9VAJE",
  authDomain: "campus-b4087.firebaseapp.com",
  projectId: "campus-b4087",
  storageBucket: "campus-b4087.appspot.com",
  messagingSenderId: "880885017120",
  appId: "1:880885017120:web:e9560b6231fbaf4a422a45",
  measurementId: "G-F86Z060M2Z"
};

const firebaseDB = firebase.initializeApp(firebaseConfig).firestore()
firebaseDB.enablePersistence({synchronizeTabs:true}).catch(err => {
  console.log(err)
  alert(err)
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
    console.log(err)
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
    console.log(err)
  }
})


export default firebaseDB;
