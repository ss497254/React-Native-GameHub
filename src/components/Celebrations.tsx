import Confetti from "./Confetti";
import React from "react";
import { Image } from "react-native";
import { Text } from "react-native-paper";

export const Celebrations = () => (
  <Confetti count={100} origin={{ x: -20, y: 0 }}>
    <Image
      source={require("../assets/icon.png")}
      style={{ height: 200, width: 200 }}
    />
    <Text>Congrats</Text>
  </Confetti>
);
