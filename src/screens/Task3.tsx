import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task3Game } from "../components/Games/Task3Game";
import { GameScreen } from "../components/GameScreen";
import { useCountDown } from "../hooks/useCountDown";

const Task3 = () => {
  const { countDown } = useCountDown(4);
  console.log(countDown);

  let cards = 8,
    grid = 6,
    images = 4;

  return (
    <GameScreen countDown={countDown}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          width: 300,
        }}
      >
        <Text style={{ flex: 1 }} variant="titleMedium">
          Cards: {cards}
        </Text>
        <Text variant="titleMedium">Images: {images}</Text>
      </View>
      <Task3Game
        cards={cards}
        images={images}
        grid={grid}
        visible={countDown > 0}
      />
    </GameScreen>
  );
};

export default Task3;
