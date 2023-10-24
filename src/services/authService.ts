import sql, {ConnectionPool} from "mssql";
import { dbConfig } from "../database/dbConfig";

export interface User {
    user: string;
    token: string;
}

export async function authenticateUser(
    username: string,
    password: string
): Promise<User | null> {
    try {
        const pool = new ConnectionPool(dbConfig);
        await pool.connect();

        const result = await pool.query`
      SELECT * FROM Users WHERE username = ${username} AND password = ${password}
    `;

        await pool.close();

        if (result.recordset.length > 0) {
            // Usuário autenticado com sucesso
            return {
                user: result.recordset[0].user,
                token: result.recordset[0].token,
            };
        } else {
            // Credenciais inválidas
            return null;
        }
    } catch (error) {
        console.error("Erro de autenticação:", error);
        throw error;
    }
}
