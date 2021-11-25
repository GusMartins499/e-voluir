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
  } | null;
  ngo: {
    id: string;
    cnpj: string;
    email: string;
  } | null;
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
  } | null;
  ngo: {
    id: string;
    cnpj: string;
    email: string;
  } | null;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Evoluir:token");
    const user = localStorage.getItem("@Evoluir:user");
    const ngo = localStorage.getItem("@Evoluir:ngo");

    if (token && user) {
      return { token, user: JSON.parse(user), ngo: null };
    }
    if (token && ngo) {
      return { token, ngo: JSON.parse(ngo), user: null };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/session", { email, password });
    const { token, user, ngo } = response.data;

    localStorage.setItem("@Evoluir:token", token);
    if (user) {
      localStorage.setItem("@Evoluir:user", JSON.stringify(user));
    }
    if (ngo) {
      localStorage.setItem("@Evoluir:ngo", JSON.stringify(ngo));
    }

    setData({ token, user, ngo });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Evoluir:token");
    localStorage.removeItem("@Evoluir:user");
    localStorage.removeItem("@Evoluir:ngo");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, ngo: data.ngo, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthProvider };
