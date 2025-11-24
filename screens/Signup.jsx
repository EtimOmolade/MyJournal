import React, { useState } from "react";
import { Alert } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedTextInput from "../components/ThemedTextInput";
import { useAuth } from "../contexts/AuthContext";

export default function Signup({ navigation }) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      Alert.alert("Success", "Account created! Please login.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <ThemedText style={{ fontSize: 28, marginBottom: 20 }}>Sign Up</ThemedText>
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
        onPress={handleSignup}
        style={{
          backgroundColor: "#4B7BEC",
          color: "white",
          padding: 15,
          borderRadius: 10,
          textAlign: "center",
        }}
      >
        Sign Up
      </ThemedText>

      <ThemedText
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20, textAlign: "center", color: "#4B7BEC" }}
      >
        Already have an account? Login
      </ThemedText>
    </ThemedView>
  );
}
