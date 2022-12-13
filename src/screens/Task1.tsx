import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task1Game } from "../components/Games/Task1Game";
import { GameScreen } from "../components/GameScreen";
import { useCountDown } from "../stores/useCountdown";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task1 = () => {
  const { updateTaskProgress, task1Progress } = useTaskProgress((s) => s);

  const { countDown, startCountDown } = useCountDown((s) => s);

  useEffect(() => {
    const clearCountDown = startCountDown(4);
    return clearCountDown;
  }, []);

  let tiles = 8,
    grid = 7;

  return (
    <GameScreen countDown={countDown} {...task1Progress}>
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
        visible={countDown.length > 0}
        onSuccess={() => {
          updateTaskProgress("task1Progress", {
            ...task1Progress,
            currLevel: task1Progress.currLevel + 1,
          });
        }}
      />
    </GameScreen>
  );
};

export default Task1;
