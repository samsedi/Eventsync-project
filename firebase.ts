import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// REPLACE WITH YOUR FIREBASE CONFIGURATION
// For development without Firebase keys, the AuthContext handles a mock fallback.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "mock-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "mock-domain",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "mock-bucket",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "mock-sender",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "mock-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
