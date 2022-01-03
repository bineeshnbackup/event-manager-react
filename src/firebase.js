import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD1KpNXX2ciJ8rRT5Y_LXcGNhpWCITvbw",
  authDomain: "login-c3102.firebaseapp.com",
  projectId: "login-c3102",
  storageBucket: "login-c3102.appspot.com",
  messagingSenderId: "86690905100",
  appId: "1:86690905100:web:4ace0ce0b60e5fd9ff8229"
};

const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export default fire;