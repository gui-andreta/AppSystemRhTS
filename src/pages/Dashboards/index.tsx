import React from "react";
import {View, Button, StyleSheet, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import {useAuth} from "../../contexts/auth";

const Dashboard: React.FC = () => {
    const {user, signOut} = useAuth();

    console.log(user);

    function handleSignOut() {
        signOut();
    }

    return (
        <LinearGradient
            colors={["#7BD2F6", "#946DED"]}
            style={styles.container}
        >
            <Text style={styles.h1}>Folha de Pagamento</Text>

            <View style={styles.container}>
                <Button title="Sign out" onPress={handleSignOut} />
            </View>
        </LinearGradient>
    );
};

export default Dashboard;

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
});
