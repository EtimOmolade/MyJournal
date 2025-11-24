import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";

import ThemedLogo from "../components/ThemedLogo";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";

export default function Landing() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Safely extract theme colors
  const backgroundColor =
    typeof theme.background === "string" ? theme.background : "#FFFFFF";
  const textColor =
    typeof theme.text === "string" ? theme.text : "#111111";
  const buttonColor =
    typeof theme.primary === "string" ? theme.primary : "#4B7BEC";

  return (
    <Animated.View
      style={[styles.container, { opacity: fadeAnim, backgroundColor }]}
    >
      <ThemedLogo />
      <Spacer height={30} />

      <ThemedText style={[styles.title, { color: textColor }]}>
        Your Daily Journal
      </ThemedText>
      <Spacer height={10} />
      <ThemedText style={[styles.subtitle, { color: textColor }]}>
        Capture your thoughts, reflect, and grow.
      </ThemedText>
      <Spacer height={20} />
      <ThemedText style={[styles.tagline, { color: textColor }]}>
        Start your journey today ✨
      </ThemedText>
      <Spacer height={30} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={() => navigation.navigate("Login")}
      >
        <ThemedText style={styles.buttonText}>Sign In</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={() => navigation.navigate("Signup")}
      >
        <ThemedText style={styles.buttonText}>Create Account</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    opacity: 0.8,
    marginTop: 5,
  },
  tagline: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    fontStyle: "italic",
  },
  button: {
    width: "70%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
