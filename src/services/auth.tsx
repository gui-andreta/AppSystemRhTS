export default function signIn() {
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