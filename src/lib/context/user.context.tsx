import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { auth } from "../config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Action, User } from "../types/user.types";

const userReducer = (user: User | {}, action: Action) => {
  switch (action.type) {
    case "login": {
      return action.user;
    }
    case "singout": {
      return {} as User;
    }
    default: {
      throw new Error(`Unhandle action type ${action.type}`);
    }
  }
};

export const UserContext = createContext({
  user: {},
  dispatch: (() => undefined) as Dispatch<Action>,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, {});
  const value = { user, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used WITHIN an AuthProvider");
  }
  return context;
};

export const ProtectedRoute = ({ children }: any) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const userContext = useUser();

  if (!user) {
    navigate("/");
    return;
  }
  const userData = userContext.user as User;

  if (userData.status === "0") {
    alert("Su cuenta ha sido deshabilitada, contacte con un administrador");
    auth.signOut();
    navigate("/");
    return;
  }

  return children;
};

