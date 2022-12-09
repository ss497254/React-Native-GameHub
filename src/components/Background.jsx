import React, { memo } from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Background = ({ children }) => (
  <ImageBackground
    source={require("../assets/images/background_dot.png")}
    resizeMode="repeat"
    style={styles.background}
  >
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
});

export default memo(Background);
