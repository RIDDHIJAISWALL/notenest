// import { initializeApp } from "firebase/app";
// import { 
//   getAuth, 
//   GoogleAuthProvider, 
//   signInWithPopup 
// } from "firebase/auth";
// import { 
//   getStorage, 
//   ref, 
//   uploadBytes, 
//   getDownloadURL, 
//   deleteObject 
// } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCW4f5YIRpaNQlKtdsdPgwLhWdIVg9OauU",
//   authDomain: "notenest-8b56a.firebaseapp.com",
//   projectId: "notenest-8b56a",
//   storageBucket: "notenest-8b56a.firebasestorage.app",
//   messagingSenderId: "590568651428",
//   appId: "1:590568651428:web:1b8e0ff102e29e34374431",
//   measurementId: "G-GG4C9TBEL8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Auth
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const googleLoginPopup = () => signInWithPopup(auth, provider);

// // Storage
// export const storage = getStorage(app);

// // Required exports for AppContext
// export {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject
// };



import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";



// 🔥 ADD THESE 2 LINES
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW4f5YIRpaNQlKtdsdPgwLhWdIVg9OauU",
  authDomain: "notenest-8b56a.firebaseapp.com",
  projectId: "notenest-8b56a",
  storageBucket: "notenest-8b56a.firebasestorage.app",
  messagingSenderId: "590568651428",
  appId: "1:590568651428:web:1b8e0ff102e29e34374431",
  measurementId: "G-GG4C9TBEL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const googleLoginPopup = () => signInWithPopup(auth, provider);

// Storage
export const storage = getStorage(app);

// 🔥 ADD THIS LINE

// Required exports for AppContext
export {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
};
