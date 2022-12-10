import { radius } from "../constants/AppStyle";
import type { task1 } from "constants/tasks";
import React from "react";
import { Image, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

export const TaskInstructionView = ({
  task,
  children,
}: {
  task: typeof task1;
  children: React.ReactNode;
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", paddingVertical: 40 }}>
      <Image
        source={task.instructionImgSrc}
        style={{
          width: 340,
          height: 235,
          marginBottom: 25,
          borderRadius: radius.m,
        }}
      />
      <View style={{ width: 340, flexDirection: "row", alignItems: "center" }}>
        <Text
          variant="titleLarge"
          style={{
            color: task.color,
            marginVertical: 3,
            flex: 1,
          }}
        >
          {task.title}
        </Text>
        <IconButton
          icon="timer"
          iconColor={task.color}
          style={{ marginRight: 0 }}
        />
        <Text variant="titleMedium" style={{ color: task.color }}>
          3 mins
        </Text>
      </View>
      <View style={{ width: 340, flex: 1 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 15 }}>
          Instruction
        </Text>
        {children}
      </View>
      <Button
        buttonColor={task.color}
        theme={{ roundness: 1.5 }}
        mode="contained"
        labelStyle={{ fontSize: 16, paddingVertical: 4 }}
        onPress={() => {}}
        style={{ width: 340 }}
      >
        OK I'M READY
      </Button>
    </View>
  );
};
