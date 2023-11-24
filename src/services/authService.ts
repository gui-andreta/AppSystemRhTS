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
        /*const pool = new ConnectionPool(dbConfig);
        await pool.connect();

        const result = await pool.query`
            SELECT * FROM Users WHERE username = ${username} AND password = ${password}
        `;

        await pool.close();

        if (username) {
            // Usuário autenticado com sucesso
            return {
                user: username,
                password: password,
                token: username,
            };
        } else {
            // Credenciais inválidas
            return null;
        }*/

        // Fazer uma solicitação à API de autenticação

        const apiUrl = 'http://127.0.0.1:5290/api/Authentication';

        console.log("Antes da solicitação da API");

        const response = await axios.post(apiUrl, {
            login: username,
            senha: password,
        });
        console.log("Após a solicitação da API", response);

        // Verificar a resposta da API
        if (response.data.authenticated) {
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
        console.error("Erro ao fazer a solicitação:", error);

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
