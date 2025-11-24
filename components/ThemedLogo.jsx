// /components/ThemedLogo.jsx
import React from "react";
import { Image } from "react-native";
import LogoImg from "../assets/img/logo.jpg"; // make sure this exists

export default function ThemedLogo({ style }) {
  return <Image source={LogoImg} style={[{ width: 120, height: 120 }, style]} />;
}
