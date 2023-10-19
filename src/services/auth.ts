interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'sidjkbgfiwegwsg',
                user: {
                    name: 'Guilherme',
                    email: 'guilherme@hotmail.com'
                },
            })
        }, 2000)
    })
}