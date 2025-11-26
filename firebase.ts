import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Safe environment variable access helper
const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  // Fallback for environments where process.env is not available
  return undefined;
};

// REPLACE WITH YOUR FIREBASE CONFIGURATION
// For development without Firebase keys, the AuthContext handles a mock fallback.
const firebaseConfig = {
  apiKey: getEnv('REACT_APP_FIREBASE_API_KEY') || "mock-key",
  authDomain: getEnv('REACT_APP_FIREBASE_AUTH_DOMAIN') || "mock-domain",
  projectId: getEnv('REACT_APP_FIREBASE_PROJECT_ID') || "mock-project",
  storageBucket: getEnv('REACT_APP_FIREBASE_STORAGE_BUCKET') || "mock-bucket",
  messagingSenderId: getEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID') || "mock-sender",
  appId: getEnv('REACT_APP_FIREBASE_APP_ID') || "mock-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);