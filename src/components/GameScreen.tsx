import React from "react";
import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar, Text } from "react-native-paper";

export const GameScreen: React.FC<any> = ({
  children,
  currLevel = 1,
  totalLevel = 2,
  scroll,
  countDown,
}) => {
  const { height } = Dimensions.get("window");

  return (
    <ScrollView
      style={{
        height: "100%",
      }}
      contentContainerStyle={{
        flex: scroll ? undefined : 1,
        alignItems: "center",
        minHeight: height,
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
        {typeof countDown !== "undefined" ? (
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              marginVertical: 20,
            }}
          >
            {countDown > 0 ? countDown : ""}
          </Text>
        ) : null}
      </View>
      {children}
      <View style={{ flexGrow: 1 }}></View>
    </ScrollView>
  );
};
