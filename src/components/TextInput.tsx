import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";

export const TextInput = ({ error, ...props }) => (
  <View style={styles.container}>
    <Input
      underlineColor="transparent"
      theme={{ roundness: radius.m }}
      error={error}
      mode="outlined"
      {...props}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  error: {
    fontSize: 14,
    color: colors["red-900"],
    paddingHorizontal: 4,
    marginLeft: 16,
    paddingTop: 4,
  },
});
