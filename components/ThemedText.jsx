import React from "react";
import { Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemedText({ style, ...props }) {
  const { theme } = useTheme();
  return <Text style={[{ color: theme.text }, style]} {...props} />;
}
