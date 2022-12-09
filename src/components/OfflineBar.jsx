import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../constants/appStyle";
import { useIsConnected } from "../stores/useIsConnected";

export const OfflineBar = () => {
  const { connected } = useIsConnected((s) => s);

  if (connected) return null;

  return (
    <View
      style={{
        height: 20,
        marginTop: -8,
        backgroundColor: colors["gray-900"],
      }}
    >
      <Text style={{ color: colors.white, textAlign: "center", fontSize: 13 }}>
        No connection
      </Text>
    </View>
  );
};
