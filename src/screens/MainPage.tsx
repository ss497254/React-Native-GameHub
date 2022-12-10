import { useRoute } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
import { task1, task2, task3, task4, task5 } from "../constants/tasks";

const setStatusbarColor = (name: string) => {
  if (name === "Task1") return task1.color;
  if (name === "Task2") return task2.color;
  if (name === "Task3") return task3.color;
  if (name === "Task4") return task4.color;
  if (name === "Task5") return task5.color;

  return colors["blue-500"];
};

const Tab = ({ title, color, progress, screen, navigate, num, icon }: any) => (
  <Surface style={styles.taskContainer}>
    <Text
      style={{
        height: 70,
        width: 45,
        display: "flex",
        textAlignVertical: "center",
        textAlign: "center",
        color,
        backgroundColor: colors["gray-200"],
      }}
      variant="titleLarge"
    >
      {num}
    </Text>
    <TouchableRipple
      style={{
        flex: 1,
        paddingTop: 12,
        paddingLeft: 12,
      }}
      onPress={() => {
        navigate(screen);
      }}
    >
      <>
        <Text
          variant="titleMedium"
          style={{
            textAlignVertical: "center",
            color,
            marginVertical: 3,
          }}
        >
          {title}
        </Text>
        <Text variant="labelSmall" style={{ color: progress.color }}>
          {progress.title}
        </Text>
        {icon}
      </>
    </TouchableRipple>
  </Surface>
);

const Tasks = [task1, task2, task3, task4, task5];

export const MainPage = ({ navigation }: any) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("state", ({ data }: any) => {
      if (!data || !data.state || data.state.length === 0) return;
      const { name } = data.state.routes[data.state.index];

      StatusBar.setBackgroundColor(setStatusbarColor(name));
    });

    return unsubscribe;
  }, [navigation]);

  StatusBar.setBarStyle("light-content");

  return (
    <LinearGradient
      colors={[colors["blue-500"], colors["blue-400"]]}
      style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 40 }}
    >
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
        <Text
          variant="titleMedium"
          style={{ color: colors.white, fontSize: 17, lineHeight: 26 }}
        >
          The complete assessment will take around 15 minutes.{"\n\n"}There will
          be 5 tasks altogether.{"\n\n"}Please find a quiet place where you can
          concentrate and perform the assessment uninterrupted
        </Text>
      </View>
      {Tasks.map((task, idx) => (
        <Tab key={idx} num={idx + 1} navigate={navigation.navigate} {...task} />
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: colors.white,
    height: 70,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: radius.m,
    marginTop: 20,
  },
});
