import axios from "axios";

export interface User {
    user: string;
    password: string;
    token: string;
}

export async function authenticateUser(
    username: string,
    password: string
): Promise<User | null> {
    try {
        // Fazer uma solicitação à API de autenticação
        const response = await axios.post(
            "http://localhost:5290/api/Authentication",
            {
                login: username,
                senha: password,
            }
        );

        // Verificar a resposta da API
        if (response.data.token) {
            // Usuário autenticado com sucesso
            return {
                user: username,
                password: password,
                token: response.data.token,
            };
        } else {
            // Credenciais inválidas
            return null;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                "Erro de autenticação:",
                error.response?.data || error.message
            );
        } else {
            console.error("Erro de autenticação:", error);
        }
        throw error;
    }
}
