import React from "react";
import { TaskInstructionView } from "../components/TaskInstructionView";
import { task2 } from "../constants/tasks";
import { Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";

const Task2 = () => {
  return (
    <TaskInstructionView task={task2}>
      <Text variant="headlineSmall" style={{ color: colors["gray-700"] }}>
        A series of numbers will be displayed.{"\n\n"}Click on the numbers in
        the same sequence as they were displayed.{"\n\n"}We will move on to the
        next task after two mistakes in a row.
      </Text>
    </TaskInstructionView>
  );
};

export default Task2;
