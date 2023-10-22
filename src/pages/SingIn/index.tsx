import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Button
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import { useAuth } from "../../contexts/auth";

const SignIn: React.FC = () => {
    const { signed, user, signIn } = useAuth();

    console.log(signed);
    console.log(user);

    function handleSignIn() {
        signIn();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={["#7BD2F6", "#946DED"]}
                style={styles.container}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <Text style={styles.h1}>Faça Seu Login</Text>

                    <View style={styles.viewLoginSenha}>
                        <Text style={styles.labelLoginSenha}>USER:</Text>

                        <TextInput
                            textContentType="nickname"
                            style={styles.inputUserPass}
                            placeholder="Digite seu Usuário"
                        />
                    </View>

                    <View style={styles.viewLoginSenha}>
                        <Text style={styles.labelLoginSenha}>PASS:</Text>

                        <TextInput
                            style={styles.inputUserPass}
                            placeholder="Digite sua Senha"
                            textContentType="password"
                            secureTextEntry={true}
                        />
                    </View>

            
                    <Button title="Sign in" onPress={handleSignIn} />
                    
                </KeyboardAvoidingView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

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