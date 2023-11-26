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
        const APIurl = "http://localhost:5290/api/Authentication";

        const response = await fetch(APIurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: username,
                senha: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();

            if (data.authenticated) {
                // Usuário autenticado com sucesso
                return {
                    user: username,
                    password: password,
                    token: data.token,
                };
            } else {
                // Credenciais inválidas
                return null;
            }
        } else {
            console.error("Erro ao fazer a solicitação:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Erro de autenticação:", error);
        throw error;
    }
}
