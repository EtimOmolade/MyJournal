import React, { useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedTextInput from "../components/ThemedTextInput";
import { useAuth } from "../contexts/AuthContext";

export default function Login({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  
  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    
    <ThemedView style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <ThemedText style={{ fontSize: 28, marginBottom: 20 }}>
        Login
      </ThemedText>







      <ThemedTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 12 }}
      />



      <ThemedTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />

      <ThemedText
        onPress={handleLogin}
        style={{
          backgroundColor: "#4B7BEC",
          color: "white",
          padding: 15,
          borderRadius: 10,
          textAlign: "center",
        }}
      >
        Login
      </ThemedText>

      <ThemedText
        onPress={() => navigation.navigate("Signup")}
        style={{ marginTop: 20, textAlign: "center", color: "#4B7BEC" }}
      >
        Don't have an account? Sign up
      </ThemedText>
    </ThemedView>
    </TouchableWithoutFeedback>
  );
}
