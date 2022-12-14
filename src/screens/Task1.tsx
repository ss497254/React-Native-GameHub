import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Celebrations } from "../components/Celebrations";
import { Task1Game } from "../components/Games/Task1Game";
import { GameScreen } from "../components/GameScreen";
import { task1Levels } from "../constants/GameLevel";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task1 = () => {
  const {
    updateTaskProgress,
    taskProgress: [task1Progress],
  } = useTaskProgress((s) => s);

  if (task1Progress.currLevel === task1Progress.totalLevel)
    return <Celebrations />;

  const { navigate } = useNavigation();
  const { tiles, grid } = task1Levels[task1Progress.currLevel];
  const { countDown } = useCountDown(5);

  return (
    <GameScreen refreshScreen="Task 1" countDown={countDown} {...task1Progress}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          width: 300,
        }}
      >
        <Text style={{ flex: 1 }} variant="titleMedium">
          Tiles: {tiles}
        </Text>
        <Text variant="titleMedium">Grid: {grid}</Text>
      </View>
      <Task1Game
        tiles={tiles}
        grid={grid}
        visible={countDown > 0}
        onSuccess={() => {
          updateTaskProgress(1, { currLevel: task1Progress.currLevel + 1 });
        }}
        onError={() => {
          //@ts-expect-error
          navigate("Task 1");
        }}
      />
    </GameScreen>
  );
};

export default Task1;
