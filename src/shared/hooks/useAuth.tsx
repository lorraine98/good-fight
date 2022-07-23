import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../FireBase";

interface Props {
  children: React.ReactNode;
}

interface AuthState {
  uid: string;
  hasAuth: boolean;
}

const defaultAuthState: AuthState = {
  uid: "",
  hasAuth: false,
};

const AuthContext = createContext(defaultAuthState);

export const AuthProvider = ({ children }: Props) => {
  const auth = getAuth(app);

  const [authState, setAuthState] = useState(defaultAuthState);

  useEffect(() => {
    console.log("useAuth useEffect called");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          uid: user.uid,
          hasAuth: true,
        });
      } else {
        setAuthState({
          uid: "",
          hasAuth: false,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
