import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../constants/appStyle";

export const HealthPage = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: "100%",
        backgroundColor: colors["blue-200"],
        padding: 15,
      }}
    >
      <Text variant="titleLarge" style={{ marginVertical: 20 }}>
        You don't have any Health specified.
      </Text>
    </ScrollView>
  );
};
