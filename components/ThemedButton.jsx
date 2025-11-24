import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

function ThemedButton({ style, children, ...props }) {
  const { theme } = useTheme(); // Get active theme (light/dark)

  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: theme.colors.primary }, // Dynamic theme color
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.8,
  },
});

export default ThemedButton;
