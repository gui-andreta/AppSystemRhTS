import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import * as auth from '../services/auth';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:user');

            await new Promise(resolve => setTimeout(resolve, 2000));

            if (storagedToken && storagedUser) {
                setUser(JSON.parse(storagedUser));

                setLoading(false);
            }
        }

        loadStorageData()
    }, []);

    async function signIn() {
        const response = await auth.signIn();

        setUser(response.user);

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@RNAuth:user', response.token);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

//Rook
export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}