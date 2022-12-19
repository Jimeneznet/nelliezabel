import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { AuthContextType, AuthProviderProps } from "../types/auth.types";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = { user, createUser, signIn, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used WITHIN an AuthProvider");
  }
  return context;
}

const ProtectedRoute = ({ children }: any) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
    return;
  }
  return children;
};

export { AuthProvider, useAuth, ProtectedRoute };
