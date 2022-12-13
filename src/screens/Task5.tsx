import React from "react";
import { task5Levels } from "../constants/GameLevel";
import { Task5Game } from "../components/Games/Task5Game";
import { GameScreen } from "../components/GameScreen";
import { useTaskProgress } from "../stores/useTaskProgress";
import Celebrations from "../components/Celebrations";
import { useNavigation } from "@react-navigation/native";

const Task5 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, _3, _4, task5Progress],
  } = useTaskProgress((s) => s);

  if (task5Progress.currLevel === task5Progress.totalLevel)
    return <Celebrations />;

  const { navigate } = useNavigation();
  const { grid, images, timer } = task5Levels[task5Progress.currLevel];

  return (
    <GameScreen {...task5Progress}>
      <Task5Game
        grid={grid}
        timer={timer}
        images={images}
        onSuccess={() => {
          updateTaskProgress(5, { currLevel: task5Progress.currLevel + 1 });
        }}
        onError={() => {
          //@ts-expect-error
          navigate("Home Page");
        }}
      />
    </GameScreen>
  );
};

export default Task5;
