import React from "react";
import { TaskInstructionView } from "../components/TaskInstructionView";
import { task3 } from "../constants/tasks";
import { Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";

const Task3 = () => {
  return (
    <TaskInstructionView task={task3}>
      <Text variant="headlineSmall" style={{ color: colors["gray-700"] }}>
        You will see a few grey cards. There may be an item behind each card.
        {"\n\n"}
        The cards with items will flip one by one.{"\n\n"}
        An item will appear in the middle of the screen. Click on the grey card
        with matching item.{"\n\n"}
        We will move on to the next task after two mistakes in a row.{"\n\n"}
      </Text>
    </TaskInstructionView>
  );
};

export default Task3;
