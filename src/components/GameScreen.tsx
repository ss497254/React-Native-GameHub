import React from "react";
import { View } from "react-native";
import { Text, ProgressBar, Button } from "react-native-paper";

export const GameScreen: React.FC<any> = ({
  children,
  currLevel = 3,
  totalLevel = 5,
  reset,
}) => {
  return (
    <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 300,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <Text style={{ flex: 1 }} variant="titleMedium">
          Progress
        </Text>
        <Text variant="titleMedium">
          {currLevel}/{totalLevel}
        </Text>
      </View>
      <ProgressBar
        progress={currLevel / totalLevel}
        style={{
          height: 10,
          borderRadius: 10,
          width: 300,
          marginBottom: 30,
        }}
      />
      {children}
      <Button
        onPress={() => reset((a: boolean) => !a)}
        labelStyle={{ fontWeight: "700", fontSize: 20 }}
        contentStyle={{ padding: 10 }}
        style={{ marginBottom: 10 }}
      >
        Reset
      </Button>
    </View>
  );
};
