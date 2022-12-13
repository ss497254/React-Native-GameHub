import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task1Game } from "../components/Games/Task1Game";
import { GameScreen } from "../components/GameScreen";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";
import { task1Levels } from "../constants/GameLevel";
import Celebrations from "../components/Celebrations";

const Task1 = () => {
  const {
    updateTaskProgress,
    taskProgress: [task1Progress],
  } = useTaskProgress((s) => s);
  if (task1Progress.currLevel === task1Progress.totalLevel)
    return <Celebrations />;

  const [anchor, reset] = useState(false);
  const { countDown } = useCountDown(5);

  const { tiles, grid } = task1Levels[task1Progress.currLevel];

  return (
    <GameScreen key={anchor} countDown={countDown} {...task1Progress}>
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
        onError={() => reset(!anchor)}
      />
    </GameScreen>
  );
};

export default Task1;
