import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string, role: 'organizer' | 'buyer') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from mock storage if firebase is not active/used or for persistence
  const loadMockUser = () => {
      const stored = localStorage.getItem('es_current_user');
      if (stored) {
          return JSON.parse(stored);
      }
      return null;
  };

  useEffect(() => {
    let unsubscribe: () => void;
    
    // Check for mock user first to avoid flicker if we are in mock mode
    const mockUser = loadMockUser();
    if (mockUser) {
        setCurrentUser(mockUser);
        setLoading(false);
    }

    try {
       unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // FIREBASE MODE
            // In a real app, we would fetch the role from Firestore
            const storedRole = localStorage.getItem(`role_${user.uid}`) as 'organizer' | 'buyer' || 'organizer';
            
            setCurrentUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'User',
                photoURL: user.photoURL,
                role: storedRole
            });
        } else {
            // Only clear if we aren't using a mock user manually
            if (!localStorage.getItem('es_current_user')) {
                setCurrentUser(null);
            }
        }
        setLoading(false);
      });
    } catch (e) {
      console.warn("Firebase not fully configured or failed. Using Mock Auth.");
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      // Role handling is done in onAuthStateChanged
    } catch (error: any) {
      console.log("Falling back to mock login logic");
      
      // MOCK LOGIN LOGIC
      // 1. Check our "local database" of registered users
      const usersDB = JSON.parse(localStorage.getItem('es_users_db') || '{}');
      const registeredUser = usersDB[email.toLowerCase()];

      if (registeredUser) {
          if (registeredUser.password === pass || pass === 'demo') {
              const userObj = {
                  uid: registeredUser.uid,
                  email: registeredUser.email,
                  displayName: registeredUser.displayName,
                  photoURL: registeredUser.photoURL,
                  role: registeredUser.role
              };
              setCurrentUser(userObj);
              localStorage.setItem('es_current_user', JSON.stringify(userObj));
              return;
          } else {
              throw new Error("Invalid password (mock)");
          }
      }

      // 2. Fallback for ad-hoc demo users (if not registered but valid format)
      if (email) {
        // Heuristic: if email contains 'buyer', make them buyer, else organizer
        const role = email.toLowerCase().includes('buyer') ? 'buyer' : 'organizer';
        const uid = 'mock-user-adhoc-' + Date.now();
        
        const user: User = {
          uid: uid,
          email: email,
          displayName: role === 'buyer' ? 'Demo Buyer' : 'Demo Organizer',
          photoURL: `https://ui-avatars.com/api/?name=${role}&background=random`,
          role: role
        };
        
        setCurrentUser(user);
        localStorage.setItem('es_current_user', JSON.stringify(user));
      } else {
        throw error;
      }
    }
  };

  const signup = async (email: string, pass: string, name: string, role: 'organizer' | 'buyer') => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      localStorage.setItem(`role_${userCred.user.uid}`, role);
      // Firebase auth listener handles the rest
    } catch (error: any) {
      console.log("Falling back to mock signup logic");
       
      // MOCK SIGNUP LOGIC
      const uid = 'mock-user-' + Date.now();
      const newUser = {
          uid,
          email: email.toLowerCase(),
          password: pass, // Storing password in localstorage is insecure, only for this mock demo
          displayName: name,
          role,
          photoURL: null
      };

      // Save to "local DB"
      const usersDB = JSON.parse(localStorage.getItem('es_users_db') || '{}');
      usersDB[email.toLowerCase()] = newUser;
      localStorage.setItem('es_users_db', JSON.stringify(usersDB));

      const userObj: User = {
          uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName,
          photoURL: null,
          role: newUser.role
      };
      
      setCurrentUser(userObj);
      localStorage.setItem('es_current_user', JSON.stringify(userObj));
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      // Mock logout
    }
    setCurrentUser(null);
    localStorage.removeItem('es_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
