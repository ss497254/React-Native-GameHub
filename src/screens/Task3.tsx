import React from "react";
import { Task3Game } from "../components/Games/Task3Game";
import { GameScreen } from "../components/GameScreen";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";
import { task3Levels } from "../constants/GameLevel";
import Celebrations from "../components/Celebrations";

const Task3 = () => {
  const { countDown } = useCountDown(5);
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, task3Progress],
  } = useTaskProgress((s) => s);
  if (task3Progress.currLevel === task3Progress.totalLevel)
    return <Celebrations />;

  const { cards, images, grid } = task3Levels[task3Progress.currLevel];

  return (
    <GameScreen {...task3Progress}>
      <Task3Game
        countDown={countDown}
        cards={cards}
        images={images}
        grid={grid}
        onSuccess={() => {
          updateTaskProgress(3, { currLevel: task3Progress.currLevel + 1 });
        }}
        onError={() => {}}
      />
    </GameScreen>
  );
};

export default Task3;
