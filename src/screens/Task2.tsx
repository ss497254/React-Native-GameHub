import { GameScreen } from "../components/GameScreen";
import React, { useEffect, useState } from "react";
import { Task2Game } from "../components/Games/Task2Game";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
import { useMemo } from "react";
import { useCountDown } from "../stores/useCountdown";
import { useTaskProgress } from "../stores/useTaskProgress";

const Tab = ({ value = { nums: [] }, res, level, countDown = "" }: any) => {
  return (
    <View
      style={{
        marginBottom: 40,
        flexDirection: "row",
        width: 300,
        justifyContent: level > 5 ? "space-between" : "space-evenly",
      }}
    >
      {(countDown.length ? res : Array(level).fill(0)).map(
        (_: number, idx: number) => {
          const active = !isNaN(value.nums[idx]);
          const visible = level - idx >= parseInt(countDown);

          return (
            <Text
              key={idx}
              variant="titleMedium"
              style={{
                fontSize: 20,
                backgroundColor: active
                  ? value.nums[idx] === res[idx]
                    ? colors["green-400"]
                    : colors["red-400"]
                  : colors["gray-300"],
                paddingVertical: 20,
                paddingHorizontal: level > 5 ? (level > 6 ? 13 : 15) : 20,
                borderRadius: radius.m,
                color: active ? colors.white : colors.black,
              }}
            >
              {visible ? res[idx] : active ? value.nums[idx] : "  "}
            </Text>
          );
        }
      )}
    </View>
  );
};

const Task2 = () => {
  const [value, setValue] = useState({ nums: [] });
  const { updateTaskProgress, task2Progress } = useTaskProgress((s) => s);

  const { countDown, startCountDown } = useCountDown((s) => s);

  const level = 6;
  const res = Array.from(
    useMemo(() => generateRandomNumberList(level, 9), [level])
  );

  useEffect(() => {
    const clearCountDown = startCountDown(level + 1);
    return clearCountDown;
  }, []);

  return (
    <GameScreen {...task2Progress}>
      {countDown.length > 0 ? (
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
          <Tab countDown={countDown} value={value} res={res} level={level} />
        </>
      ) : (
        <>
          <Tab value={value} res={res} level={level} />
          <Task2Game
            setValue={setValue}
            nums={value.nums}
            onSuccess={() => {
              updateTaskProgress("task2Progress", {
                ...task2Progress,
                currLevel: task2Progress.currLevel + 1,
              });
            }}
          />
        </>
      )}
    </GameScreen>
  );
};

export default Task2;
