import React from "react";
// import { View } from "react-native";
// import { Text } from "react-native-paper";
import { Task5Game } from "../components/Games/Task5Game";
import { GameScreen } from "../components/GameScreen";
// import { useCountDown } from "../stores/useCountdown";

const Task5 = () => {
  // const { countDown, startCountDown } = useCountDown((s) => s);

  // useEffect(() => {
  //   const clearCountDown = startCountDown(4);
  //   return clearCountDown;
  // }, [a]);

  return (
    <GameScreen>
      <Task5Game grid={7} tiles={4} />
    </GameScreen>
  );
};

export default Task5;
