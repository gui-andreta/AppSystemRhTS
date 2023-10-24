import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import {useAuth} from "../../contexts/auth";
import {authenticateUser} from "../../services/authService";
//import {dbConfig} from "../../database/dbConfig";

const SignIn: React.FC = () => {
    const {signIn} = useAuth();
    const [username, setUsername] = useState(""); // Estado para o nome de usuário
    const [password, setPassword] = useState(""); // Estado para a senha

    function handleSignIn() {
        authenticateUser(username, password)
            .then((user) => {
                if (user) {
                    // Usuário autenticado com sucesso
                    // Chame a função 'signIn' ou navegue para a próxima tela
                    signIn(username, password);
                } else {
                    // Credenciais inválidas, exiba uma mensagem de erro ao usuário
                    console.log(
                        "Credenciais inválidas. Por favor, tente novamente."
                    );
                }
            })
            .catch((error) => {
                // Tratar erros de autenticação de forma apropriada
                console.error("Erro de autenticação:", error);
            });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={["#7BD2F6", "#946DED"]}
                style={styles.container}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <Text style={styles.h1}>Faça Seu Login</Text>

                    <View style={styles.viewLoginSenha}>
                        <Text style={styles.labelLoginSenha}>USER:</Text>

                        <TextInput
                            textContentType="username"
                            style={styles.inputUserPass}
                            placeholder="Digite seu Usuário"
                            onChangeText={(text) => setUsername(text)} // Atualize o estado 'username'
                        />
                    </View>

                    <View style={styles.viewLoginSenha}>
                        <Text style={styles.labelLoginSenha}>PASS:</Text>

                        <TextInput
                            style={styles.inputUserPass}
                            placeholder="Digite sua Senha"
                            textContentType="password"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)} // Atualize o estado 'password'
                        />
                    </View>

                    <Button title="Sign in" onPress={() => {handleSignIn()}} />
                </KeyboardAvoidingView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        width: "100%",
    },

    h1: {
        fontSize: 26,
        fontWeight: "800",
        fontStyle: "normal",
        color: "#fff",
        marginBottom: 30,
        textShadowColor: "#000",
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 3,
    },

    inputUserPass: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        paddingLeft: 15,
        paddingTop: 5,
        marginBottom: 15,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 10,
    },

    viewLoginSenha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },

    labelLoginSenha: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        marginRight: 10,
        textShadowColor: "#000",
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 3,
        paddingBottom: 13,
    },
});
