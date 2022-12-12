import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task1Game } from "../components/Games/Task1Game";
import { GameScreen } from "../components/GameScreen";
import { useCountDown } from "../stores/useCountdown";

const Task1 = () => {
  const [a, reset] = useState(false);
  const { countDown, startCountDown } = useCountDown((s) => s);

  useEffect(() => {
    const clearCountDown = startCountDown(4);
    return clearCountDown;
  }, [a]);

  let tiles = 8,
    grid = 7;

  return (
    <GameScreen key={a} reset={reset} countDown={countDown}>
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
      <Task1Game tiles={tiles} grid={grid} visible={countDown.length > 0} />
    </GameScreen>
  );
};

export default Task1;
