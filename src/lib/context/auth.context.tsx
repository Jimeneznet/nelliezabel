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
import { getUser } from "hooks/useGetAuth";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

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
  const [isEnable, setEnable] = useState<boolean>(false);
  useEffect(() => {
    if (!user) {
      navigate("/");
      auth.signOut();
      return;
    }
    const handleGetUserDoc = async () => {
      const userDoc = (await getUser(
        user.uid
      )) as QueryDocumentSnapshot<DocumentData>;

      if (!userDoc) {
        navigate("/");
        auth.signOut();
        return;
      }

      if (userDoc.data().status === "0") {
        navigate("/");
        alert("Usted está deshabilitado");
        auth.signOut();
        return;
      }

      setEnable(true);
    };
    handleGetUserDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isEnable ? children : null;
};

export { AuthProvider, useAuth, ProtectedRoute };
