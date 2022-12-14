import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Celebrations } from "../components/Celebrations";
import { Task3Game } from "../components/Games/Task3Game";
import { GameScreen } from "../components/GameScreen";
import { ResultModal } from "../components/ResultModal";
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

  const { navigate, setParams } = useNavigation();
  const { cards, images, grid } = task3Levels[task3Progress.currLevel];
  const { countDown } = useCountDown(5);
  const [result, setResult] = useState<"success" | "error" | "">("");
  const Navigate = navigate as any;

  const onRefresh = () => {
    //@ts-ignore
    setParams({ key: Math.random() });
  };

  return (
    <GameScreen onRefresh={onRefresh} {...task3Progress}>
      <ResultModal
        result={result}
        onClickBtnB={() => {
          if (result === "success") {
            updateTaskProgress(3, { currLevel: task3Progress.currLevel + 1 });
          } else {
            onRefresh();
          }
        }}
        onClickBtnA={() => {
          if (result === "success") {
            updateTaskProgress(3, { currLevel: task3Progress.currLevel + 1 });
          }
          Navigate("Task 3");
        }}
      />
      <Task3Game
        countDown={countDown}
        cards={cards}
        images={images}
        grid={grid}
        onSuccess={() => {
          setResult("success");
        }}
        onError={() => {
          setResult("error");
        }}
      />
    </GameScreen>
  );
};

export default Task3;
