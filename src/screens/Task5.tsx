import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task5Game } from "../components/Games/Task5Game";
import { GameScreen } from "../components/GameScreen";
import { useCountDown } from "../stores/useCountdown";

const Task5 = () => {
  const [a, reset] = useState(false);
  const { countDown, startCountDown } = useCountDown((s) => s);

  useEffect(() => {
    const clearCountDown = startCountDown(4);
    return clearCountDown;
  }, [a]);

  let tiles = 8,
    grid = 7;

  return (
    <GameScreen key={a} reset={reset}>
      <Text style={{ fontSize: 30, fontWeight: "700", marginVertical: 40 }}>
        {countDown.length > 0 ? countDown : "Start"}
      </Text>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          width: 300,
        }}
      >
        <Text style={{ flex: 1 }} variant="titleMedium">
          Tiles: {tiles}
        </Text>
        <Text variant="titleMedium">Grid: {grid}</Text>
      </View>
      <Task5Game tiles={tiles} grid={grid} visible={countDown.length > 0} />
    </GameScreen>
  );
};

export default Task5;
