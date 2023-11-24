import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthData {
  email: string;
  name: string;
}

interface AuthContextData {
  logar: any;
  setUserLogado: any;
  authData?: AuthData;
  signOut: () => Promise<void>;
  loading: boolean;
  refreshPage: any;
  setRefreshPage: any;
  userLogado: any;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);
  const [userLogado, setUserLogado] = useState({});
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    loadStorage();
  }, []);

  async function loadStorage() {
    const auth = await AsyncStorage.getItem('@AuthData');
    if (auth) {
      setAuthData(JSON.parse(auth) as AuthData);
      setUserLogado(JSON.parse(auth) as AuthData);
    }
    setLoading(false);
  }

  function logar(data) {
    setAuthData(data);
    setRefreshPage((r) => !r);
  }

  async function signOut(): Promise<void> {
    //logout
    setAuthData(undefined);
    AsyncStorage.removeItem('@AuthData');

    return;
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signOut,
        logar,
        setUserLogado,
        refreshPage,
        setRefreshPage,
        userLogado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
