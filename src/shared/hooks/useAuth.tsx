import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser, createUser } from "src/api/auth";
import UserShareCode from "src/components/common/UserShareCode";
import BottomSheet from "../components/bottom-sheet";
import { app } from "../FireBase";

interface Props {
  children: React.ReactNode;
}

interface AuthState {
  uid: string;
  hasAuth: boolean;
  linkCode: string;
}

const defaultAuthState: AuthState = {
  uid: "",
  hasAuth: false,
  linkCode: "",
};

const AuthContext = createContext(defaultAuthState);

export const AuthProvider = ({ children }: Props) => {
  const auth = getAuth(app);
  const [open, setOpen] = useState(false);
  const [authState, setAuthState] = useState(defaultAuthState);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const createUserTable = async () => {
    if (!authState.hasAuth) {
      return;
    }
    const user = await getUser(authState.uid);

    if (authState.uid && !user) {
      const userData = await createUser(authState.uid);
      setAuthState({
        ...authState,
        linkCode: userData?.linkCode ?? "",
      });
      setOpen(true);
    }
  };

  useEffect(() => {
    createUserTable();
  }, [authState.hasAuth]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          ...authState,
          uid: user.uid,
          hasAuth: true,
        });
      } else {
        setAuthState(defaultAuthState);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
      <BottomSheet
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <UserShareCode />
      </BottomSheet>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
