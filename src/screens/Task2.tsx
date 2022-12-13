import React, { useMemo, useState } from "react";
import { Text } from "react-native-paper";
import { Task2Game } from "../components/Games/Task2Game";
import { GameScreen } from "../components/GameScreen";
import { NumberButton } from "../components/NumberButton";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";
import { task2Levels } from "../constants/GameLevel";
import Celebrations from "../components/Celebrations";
import { useNavigation } from "@react-navigation/native";

const Task2 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_, task2Progress],
  } = useTaskProgress((s) => s);

  if (task2Progress.currLevel === task2Progress.totalLevel)
    return <Celebrations />;

  const { navigate } = useNavigation();
  const { level } = task2Levels[task2Progress.currLevel];
  const { countDown } = useCountDown(level);

  const [value, setValue] = useState({ nums: [] });

  const res = Array.from(
    useMemo(() => generateRandomNumberList(level, 9), [level])
  );

  return (
    <GameScreen {...task2Progress}>
      {countDown > 0 ? (
        <>
          <Text
            style={{
              flexGrow: 1,
              marginTop: -200,
              fontSize: 40,
              fontWeight: "700",
              textAlignVertical: "center",
            }}
          >
            {countDown}
          </Text>
          <NumberButton
            countDown={countDown}
            value={value}
            res={res}
            level={level}
          />
        </>
      ) : (
        <>
          <NumberButton value={value} res={res} level={level} />
          <Task2Game
            setValue={setValue}
            nums={value.nums}
            onSuccess={() => {
              updateTaskProgress(2, {
                ...task2Progress,
                currLevel: task2Progress.currLevel + 1,
              });
            }}
            onError={() => {
              //@ts-expect-error
              navigate("Home Page");
            }}
          />
        </>
      )}
    </GameScreen>
  );
};

export default Task2;
