import React from "react";
import { task5Levels } from "../constants/GameLevel";
import { Task5Game } from "../components/Games/Task5Game";
import { GameScreen } from "../components/GameScreen";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task5 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, _3, _4, task5Progress],
  } = useTaskProgress((s) => s);

  const { grid, images } = task5Levels[task5Progress.currLevel];

  return (
    <GameScreen {...task5Progress}>
      <Task5Game
        grid={grid}
        images={images}
        onSuccess={() => {
          updateTaskProgress(5, { currLevel: task5Progress.currLevel + 1 });
        }}
      />
    </GameScreen>
  );
};

export default Task5;
