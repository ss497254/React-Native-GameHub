import { View, StatusBar, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { Button, Text } from "react-native-paper";
import { useActivityLog } from "../stores/useActivityLog";
import { task1, task2, task3, task4, task5 } from "../constants/tasks";
import { colors } from "../constants/AppStyle";

const setStatusbarColor = (name: string) => {
  if (name.includes("Task 1")) return task1.color;
  if (name.includes("Task 2")) return task2.color;
  if (name.includes("Task 3")) return task3.color;
  if (name.includes("Task 4")) return task4.color;
  if (name.includes("Task 5")) return task5.color;

  return colors["blue-600"];
};

const LandingScreen = ({ navigation }: any) => {
  const ref = useRef("");
  const { addActivity } = useActivityLog((s) => s);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", ({ data }: any) => {
      const name = data.state.routeNames[data.state.index];

      if (ref.current === name) return;

      ref.current = name;
      StatusBar.setBackgroundColor(setStatusbarColor(name));

      addActivity({
        timestamp: new Date().getTime(),
        message: "Moved to Screen " + name,
      });
    });

    return unsubscribe;
  }, [navigation]);

  StatusBar.setBarStyle("light-content");

  return (
    <View style={{ flex: 1, paddingVertical: "20%", alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          marginBottom: 30,
          width: 300,
        }}
      >
        <Image
          source={require("../assets/images/general-instruction.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text
          variant="headlineLarge"
          style={{
            color: colors["blue-600"],
            fontWeight: "700",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          General Instructions
        </Text>
        <Text variant="headlineSmall" style={{ fontSize: 17, lineHeight: 26 }}>
          The complete assessment will take around 15 minutes.{"\n\n"}There will
          be 5 tasks altogether.{"\n\n"}Please find a quiet place where you can
          concentrate and perform the assessment uninterrupted
        </Text>
      </View>
      <Button
        mode="contained"
        style={{ width: 300, backgroundColor: colors["blue-600"] }}
        onPress={() => navigation.navigate("Home Page")}
      >
        OK! LET'S START
      </Button>
    </View>
  );
};

export default LandingScreen;
