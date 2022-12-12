import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, ProgressBar, Button } from "react-native-paper";

export const GameScreen: React.FC<any> = ({
  children,
  currLevel = 3,
  totalLevel = 5,
  reset,
  scroll,
  countDown,
}) => {
  return (
    <ScrollView
      style={{
        height: "100%",
      }}
      contentContainerStyle={{
        flex: scroll ? undefined : 1,
        alignItems: "center",
      }}
    >
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
      <View style={{ flexGrow: 1 }}>
        {typeof countDown === "string" ? (
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              marginVertical: 20,
            }}
          >
            {countDown.length > 0 ? countDown : ""}
          </Text>
        ) : null}
      </View>
      {children}
      <View style={{ flexGrow: 1 }}></View>
      <Button
        onPress={() => reset((a: boolean) => !a)}
        labelStyle={{ letterSpacing: 0.1, fontSize: 20 }}
        contentStyle={{ paddingVertical: 6, paddingHorizontal: 30 }}
        style={{ marginVertical: 14 }}
      >
        Reset
      </Button>
    </ScrollView>
  );
};
