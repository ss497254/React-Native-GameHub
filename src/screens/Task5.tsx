import React from "react";
import { TaskInstructionView } from "../components/TaskInstructionView";
import { task5 } from "../constants/tasks";
import { Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";

const Task5 = () => {
  return (
    <TaskInstructionView task={task5}>
      <Text variant="headlineSmall" style={{ color: colors["gray-700"] }}>
        You will see a maze displayed.{"\n\n"}Drag the red ball to collect all
        the cherries, then exit at the letter E.{"\n\n"}You can click on the “I
        Give Up” button at any time to end this task.
      </Text>
    </TaskInstructionView>
  );
};

export default Task5;
