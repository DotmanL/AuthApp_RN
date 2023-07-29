import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
});

function AuthContextProvider(props: Props) {
  const { children } = props;
  const [authToken, setAuthToken] = useState<string | null>(null);

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
