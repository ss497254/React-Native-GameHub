import { useNavigation } from "@react-navigation/native";
import React from "react";
import Celebrations from "../components/Celebrations";
import { Task2Game } from "../components/Games/Task2Game";
import { GameScreen } from "../components/GameScreen";
import { task2Levels } from "../constants/GameLevel";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task2 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_, task2Progress],
  } = useTaskProgress((s) => s);

  if (task2Progress.currLevel === task2Progress.totalLevel)
    return <Celebrations />;

  const { navigate } = useNavigation();
  const { level } = task2Levels[task2Progress.currLevel];
  const { countDown } = useCountDown(level + 1);

  return (
    <GameScreen {...task2Progress}>
      <Task2Game
        level={level}
        countDown={countDown}
        onSuccess={() => {
          updateTaskProgress(2, {
            ...task2Progress,
            currLevel: task2Progress.currLevel + 1,
          });
        }}
        onError={() => {
          //@ts-ignore
          navigate("Task 2", { payload: { hi: "hi" } });
        }}
      />
    </GameScreen>
  );
};

export default Task2;
