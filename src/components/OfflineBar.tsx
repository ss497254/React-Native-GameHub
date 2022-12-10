import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";
import { useNetworkStatus } from "../stores/useNetworkStatus";

export const OfflineBar = () => {
  const { isInternetReachable, isConnected } = useNetworkStatus((s) => s);

  if (isInternetReachable && isConnected) return null;

  return (
    <View
      style={{
        height: 20,
        marginTop: -8,
        backgroundColor: isConnected ? colors["green-500"] : colors["red-500"],
      }}
    >
      <Text style={{ color: colors.white, textAlign: "center", fontSize: 13 }}>
        No connection
      </Text>
    </View>
  );
};
