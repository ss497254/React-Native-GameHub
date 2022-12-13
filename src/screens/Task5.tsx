import React from "react";
// import { View } from "react-native";
// import { Text } from "react-native-paper";
import { Task5Game } from "../components/Games/Task5Game";
import { GameScreen } from "../components/GameScreen";

const Task5 = () => {
  return (
    <GameScreen>
      <Task5Game grid={7} tiles={4} />
    </GameScreen>
  );
};

export default Task5;
