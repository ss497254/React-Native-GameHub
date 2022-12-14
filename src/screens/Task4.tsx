import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Celebrations } from "../components/Celebrations";
import { Task4Game } from "../components/Games/Task4Game";
import { GameScreen } from "../components/GameScreen";
import { task4Levels } from "../constants/GameLevel";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";

const Task4 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, _3, task4Progress],
  } = useTaskProgress((s) => s);

  if (task4Progress.currLevel === task4Progress.totalLevel)
    return <Celebrations />;

  const { navigate } = useNavigation();
  const { words, time } = task4Levels[task4Progress.currLevel];
  const { countDown } = useCountDown(time);

  return (
    <GameScreen
      refreshScreen="Task 4"
      countDown={countDown}
      scroll
      {...task4Progress}
    >
      <Task4Game
        wordsToShow={words}
        countDown={countDown}
        onSuccess={() => {
          updateTaskProgress(4, { currLevel: task4Progress.currLevel + 1 });
        }}
        onError={() => {
          //@ts-expect-error
          navigate("Task 4");
        }}
      />
      <View style={{ height: 60 }} />
    </GameScreen>
  );
};

export default Task4;
