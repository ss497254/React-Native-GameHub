import React from "react";
import { TaskInstructionView } from "../components/TaskInstructionView";
import { task1 } from "../constants/tasks";
import { Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";

const Task1 = () => {
  return (
    <TaskInstructionView task={task1}>
      <Text variant="headlineSmall" style={{ color: colors["gray-700"] }}>
        You will see a blue grid with some green squares.{"\n\n"}Remember the
        locations of the green squares.{"\n\n"}After the green squares
        disappear, tap on the squares where they used to be.{"\n\n"}We will move
        on to the next task after two mistakes in a row.
      </Text>
    </TaskInstructionView>
  );
};

export default Task1;
