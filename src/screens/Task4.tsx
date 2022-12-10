import React from "react";
import { TaskInstructionView } from "../components/TaskInstructionView";
import { task4 } from "../constants/tasks";
import { Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";

const Task4 = () => {
  return (
    <TaskInstructionView task={task4}>
      <Text variant="headlineSmall" style={{ color: colors["gray-700"] }}>
        You will be given 15 seconds to look at list of 9 words (List A).
        {"\n\n"}
        After timer is up, type in as many words as you can remember from the
        list.{"\n\n"}
      </Text>
    </TaskInstructionView>
  );
};

export default Task4;
