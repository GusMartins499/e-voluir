import { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthState = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Evoluir:token");
    const user = localStorage.getItem("@Evoluir:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/session", { email, password });
    const { token, user } = response.data;

    localStorage.setItem("@Evoluir:token", token);
    localStorage.setItem("@Evoluir:user", JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Evoluir:token");
    localStorage.removeItem("@Evoluir:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthProvider };
