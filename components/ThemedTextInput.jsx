import React from "react";
import { TextInput } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemedTextInput({ style, ...props }) {
  const { theme } = useTheme();
  return (
    <TextInput
      placeholderTextColor={theme.text + "88"}
      style={[
        {
          backgroundColor: theme.inputBackground,
          color: theme.inputText,
          padding: 12,
          borderRadius: 8,
        },
        style,
      ]}
      {...props}
    />
  );
}
