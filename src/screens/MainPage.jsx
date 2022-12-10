import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import { colors, radius } from "../constants/appStyle";

export const MainPage = () => {
  StatusBar.setBackgroundColor(colors["blue-500"]);
  StatusBar.setBarStyle("light-content");

  return (
    <LinearGradient
      colors={[colors["blue-500"], colors["blue-400"]]}
      style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 40 }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}></View>
      <Surface style={styles.taskContainer}>
        <Text
          style={{
            borderRadius: 100,
            height: 40,
            width: 40,
            display: "flex",
            textAlignVertical: "center",
            textAlign: "center",
            backgroundColor: colors["gray-300"],
            marginHorizontal: 12,
          }}
          variant="headlineSmall"
        >
          1
        </Text>
      </Surface>
      <Surface style={styles.taskContainer}>
        <Text
          style={{
            borderRadius: 100,
            height: 40,
            width: 40,
            display: "flex",
            textAlignVertical: "center",
            textAlign: "center",
            backgroundColor: colors["gray-300"],
            marginHorizontal: 12,
          }}
          variant="headlineSmall"
        >
          2
        </Text>
      </Surface>
      <Surface style={styles.taskContainer}>
        <Text
          style={{
            borderRadius: 100,
            height: 40,
            width: 40,
            display: "flex",
            textAlignVertical: "center",
            textAlign: "center",
            backgroundColor: colors["gray-300"],
            marginHorizontal: 12,
          }}
          variant="headlineSmall"
        >
          3
        </Text>
      </Surface>
      <Surface style={styles.taskContainer}>
        <Text
          style={{
            borderRadius: 100,
            height: 40,
            width: 40,
            display: "flex",
            textAlignVertical: "center",
            textAlign: "center",
            backgroundColor: colors["gray-300"],
            marginHorizontal: 12,
          }}
          variant="headlineSmall"
        >
          4
        </Text>
      </Surface>
      <Surface style={styles.taskContainer}>
        <Text
          style={{
            borderRadius: 100,
            height: 40,
            width: 40,
            marginHorizontal: 12,
            display: "flex",
            textAlignVertical: "center",
            textAlign: "center",
            backgroundColor: colors["gray-300"],
          }}
          variant="headlineSmall"
        >
          5
        </Text>
      </Surface>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: colors.white,
    height: 70,
    overflow: "hidden",
    borderRadius: radius.m,
    marginTop: 20,
    justifyContent: "center",
  },
});
