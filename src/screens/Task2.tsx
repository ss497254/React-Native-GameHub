import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Celebrations } from "../components/Celebrations";
import { Task2Game } from "../components/Games/Task2Game";
import { GameScreen } from "../components/GameScreen";
import { ResultModal } from "../components/ResultModal";
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

  const { navigate, setParams } = useNavigation();
  const { numLength, reverse } = task2Levels[task2Progress.currLevel];
  const { countDown } = useCountDown(numLength + 1);
  const [result, setResult] = useState<"success" | "error" | "">("");
  const Navigate = navigate as any;

  const onRefresh = () => {
    //@ts-ignore
    setParams({ key: Math.random() });
  };

  return (
    <GameScreen onRefresh={onRefresh} {...task2Progress}>
      <ResultModal
        result={result}
        onClickBtnB={() => {
          if (result === "success") {
            updateTaskProgress(2, { currLevel: task2Progress.currLevel + 1 });
          } else {
            onRefresh();
          }
        }}
        onClickBtnA={() => {
          if (result === "success") {
            updateTaskProgress(2, { currLevel: task2Progress.currLevel + 1 });
          }
          Navigate("Task 2");
        }}
      />
      <Task2Game
        level={numLength}
        reverse={reverse}
        countDown={countDown}
        onSuccess={() => {
          setResult("success");
        }}
        onError={() => {
          setTimeout(() => {
            setResult("error");
          }, 200);
        }}
      />
    </GameScreen>
  );
};

export default Task2;
