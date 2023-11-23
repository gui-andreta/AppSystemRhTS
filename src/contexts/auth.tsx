import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authService from "../services/authService";
import {User} from "../services/authService";

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(username: string, password: string): Promise<void>;
    signOut(): void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem("@RNAuth:user");
            // Remova atraso não necessário
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(username: string, password: string): Promise<void> {
        const response = await authService.authenticateUser(username, password);

        if (response) {
            setUser(response); // Não há necessidade de aninhar user
            await AsyncStorage.setItem(
                "@RNAuth:user",
                JSON.stringify(response)
            );
        } else {
            // Lidar com a autenticação mal-sucedida, como exibir uma mensagem de erro.
        }
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null); // Defina o usuário como nulo
        });
    }

    return (
        <AuthContext.Provider
            value={{signed: !!user, user, loading, signIn, signOut}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
