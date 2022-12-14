import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Celebrations } from "../components/Celebrations";
import { Task3Game } from "../components/Games/Task3Game";
import { GameScreen } from "../components/GameScreen";
import { task3Levels } from "../constants/GameLevel";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task3 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, task3Progress],
  } = useTaskProgress((s) => s);

  if (task3Progress.currLevel === task3Progress.totalLevel)
    return <Celebrations />;

  const { navigate } = useNavigation();
  const { cards, images, grid } = task3Levels[task3Progress.currLevel];
  const { countDown } = useCountDown(5);

  return (
    <GameScreen refreshScreen="Task 4" {...task3Progress}>
      <Task3Game
        countDown={countDown}
        cards={cards}
        images={images}
        grid={grid}
        onSuccess={() => {
          updateTaskProgress(3, { currLevel: task3Progress.currLevel + 1 });
        }}
        onError={() => {
          //@ts-expect-error
          navigate("Task 3");
        }}
      />
    </GameScreen>
  );
};

export default Task3;
