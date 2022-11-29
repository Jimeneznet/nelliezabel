import { User, UserCredential } from "firebase/auth";

export type AuthContextType = {
    user: User | null,
    createUser: (email: string, password: string) => Promise<UserCredential>,
    signIn:  (email: string, password: string) => Promise<UserCredential>,
    logout: () => Promise<void>,
}

export interface AuthProviderProps { children?: React.ReactNode}
